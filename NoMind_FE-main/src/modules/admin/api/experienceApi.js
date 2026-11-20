import { httpClient } from "../../../api/httpClient";

// Uses the public follower endpoint (no auth required) to list milestones.
// FollowerExperienceController returns HTTP 302 FOUND on success.
export const fetchMilestones = async () => {
  const response = await httpClient.get('/follower/experience', {
    params: { size: 2000 },
    validateStatus: (status) => (status >= 200 && status < 300) || status === 302,
  });
  const data = Array.isArray(response.data?.data) ? response.data.data : (Array.isArray(response.data) ? response.data : []);
  return data.map((m) => ({
    ...m,
    id: m.expId ?? m.id,
    order: parseInt(m.displayOrder, 10) || m.order || 0,
  }));
};

export const fetchMilestoneById = async (id) => {
  const list = await fetchMilestones();
  return list.find((m) => String(m.id) === String(id));
};

export const createMilestone = async (payload) => {
  const response = await httpClient.post("/admin/experience", payload);
  return response.data;
};

export const updateMilestone = async (id, payload) => {
  // AdminExperienceController: PUT /api/v1/admin/experience/{expId}
  const response = await httpClient.put(`/admin/experience/${id}`, payload);
  return response.data;
};

export const deleteMilestone = async (id) => {
  // AdminExperienceController.deleteExperience: DELETE /admin/experience/{expId}
  const response = await httpClient.delete(`/admin/experience/${id}`);
  return response.data;
};
