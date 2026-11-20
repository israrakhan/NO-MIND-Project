import { httpClient } from "../../../api/httpClient";
import { handlePaginatedResponse, extractData } from "../../../api/apiUtils";

export const fetchEnrollments = async ({
  status,
  page = 0,
  size = 20,
} = {}) => {
  const response = await httpClient.get("/admin/enrollments", {
    params: { status, page, size },
  });
  const normalized = handlePaginatedResponse(response);
  console.log("fetchEnrollments received data:", normalized.totalElements);
  return normalized;
};

export const fetchEnrollmentById = async (id) => {
  const response = await httpClient.get(`/admin/enrollments/${id}`);
  return extractData(response);
};

export const updateEnrollmentStatus = async (id, updateStatusDTO) => {
  const response = await httpClient.patch(
    `/admin/enrollments/${id}/status`,
    updateStatusDTO,
  );
  return response.data;
};

export const updateEnrollmentNotes = async (id, updateNotesDTO) => {
  const response = await httpClient.patch(
    `/admin/enrollments/${id}/notes`,
    updateNotesDTO,
  );
  return response.data;
};

export const fetchEnrollmentsByProgramId = async (programId, page = 0, size = 20) => {
  const response = await httpClient.get(`/admin/programs/enrollments/${programId}`, {
    params: { page, size },
  });
  return handlePaginatedResponse(response);
};

export const deleteEnrollment = async (id) => {
  const response = await httpClient.delete(`/admin/enrollments/${id}`);
  return response.data;
};
