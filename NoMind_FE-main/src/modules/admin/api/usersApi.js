import { httpClient } from "../../../api/httpClient";

// ─── Auth Endpoints ────────────────────────────────────────────────────────

export const adminLogin = async (credentials) => {
  // AdminLoginDTO expects { phone, password }.
  const response = await httpClient.post("/admin/login", {
    phone: credentials?.phone ?? "",
    password: credentials?.password,
  });
  return response.data;
};

// ─── Operator (Users) Endpoints ────────────────────────────────────────────

export const fetchUsers = async () => {
  const response = await httpClient.get("/operator");
  // API returns ApiResponseDTO wrapper, extract the data array
  const data = response.data?.data || response.data;
  console.log("fetchUsers response:", response.data);
  console.log("fetchUsers extracted data:", data);
  return data;
};

export const fetchUserById = async (userId) => {
  const response = await httpClient.get(`/operator/${userId}`);
  // API returns ApiResponseDTO wrapper, extract the data object
  const data = response.data?.data || response.data;
  console.log(`fetchUserById(${userId}) response:`, response.data);
  console.log(`fetchUserById(${userId}) extracted data:`, data);
  return data;
};

export const getUserById = async (userId) => {
  return fetchUserById(userId);
};

export const createUser = async (createOperatorDTO) => {
  const response = await httpClient.post("/operator", createOperatorDTO);
  return response.data?.data || response.data;
};

export const updateUser = async (userId, updateUserDTO) => {
  const response = await httpClient.put(
    `/operator/${userId}`,
    updateUserDTO,
  );
  return response.data?.data || response.data;
};

export const deleteUser = async (userId) => {
  const response = await httpClient.delete(`/operator/${userId}`);
  return response.data?.data || response.data;
};
