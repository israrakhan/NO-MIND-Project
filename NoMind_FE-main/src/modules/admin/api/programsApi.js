import { httpClient } from "../../../api/httpClient";
import { handlePaginatedResponse, extractData } from "../../../api/apiUtils";

export const fetchPrograms = async (page = 0, size = 6) => {
  const response = await httpClient.get("/admin/programs", {
    params: { page, size },
  });
  return handlePaginatedResponse(response);
};

export const fetchAllPrograms = async () => {
  const response = await httpClient.get("/admin/programs", {
    params: { page: 0, size: 1000 },
  });
  const data = extractData(response);
  return data?.content ?? (Array.isArray(data) ? data : []);
};

export const fetchProgramById = async (programId) => {
  const response = await httpClient.get("/admin/programs", {
    params: { id: programId },
  });
  const data = extractData(response);
  // With Page-based response, programs are in .content
  const list = data?.content ?? (Array.isArray(data) ? data : [data]);
  return list[0];
};

export const createProgram = async (programData, imageFile) => {
  const formData = new FormData();
  formData.append("event", JSON.stringify(programData));
  if (imageFile) {
    formData.append("image", imageFile);
  }
  const response = await httpClient.post("/admin/programs/save", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProgram = async (programId, programData, imageFile) => {
  const formData = new FormData();
  formData.append("event", JSON.stringify({ ...programData, id: programId }));
  if (imageFile) {
    formData.append("image", imageFile);
  }
  const response = await httpClient.post("/admin/programs/save", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteProgram = async (programId) => {
  const response = await httpClient.delete("/admin/programs", {
    params: { id: programId },
  });
  return response.data;
};
