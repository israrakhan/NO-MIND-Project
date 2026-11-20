import { httpClient } from "../../../api/httpClient";

export const submitInquiry = async (payload) => {
  // Backend: POST /follower/inquiries — accepts InquirieRequest DTO
  const response = await httpClient.post("/follower/inquiries", payload);
  return response.data;
};

export const submitEnrollment = async (payload) => {
  // Backend: POST /follower/enrollments — FollowerEnrollmentController
  const response = await httpClient.post("/follower/enrollments", payload);
  return response.data;
};

export const fetchPublicPrograms = async (page = 0, size = 6) => {
  // Backend: GET /follower/programs — response wrapped in ApiResponseDTO, data is a Page object
  const response = await httpClient.get("/follower/programs", { params: { page, size } });
  const data = response.data?.data ?? response.data;
  return {
    content: data?.content ?? (Array.isArray(data) ? data : []),
    totalPages: data?.totalPages ?? 1,
    currentPage: data?.number ?? 0,
    totalElements: data?.totalElements ?? 0,
  };
};

export const fetchPublicMilestones = async () => {
  // Backend: GET /follower/experience — FollowerExperienceController may return 302 FOUND
  // Response wrapped in ApiResponseDTO { success, message, data: [...] }
  const response = await httpClient.get("/follower/experience", {
    params: { size: 2000 },
    validateStatus: (status) => (status >= 200 && status < 300) || status === 302,
  });
  const data =
    Array.isArray(response.data?.data)
      ? response.data.data
      : Array.isArray(response.data)
      ? response.data
      : [];
  return data.map((m) => ({
    ...m,
    id: m.expId,
    order: parseInt(m.displayOrder, 10) || 0,
  }));
};
