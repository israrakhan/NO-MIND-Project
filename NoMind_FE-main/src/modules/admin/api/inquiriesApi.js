import { httpClient } from "../../../api/httpClient";

export const fetchInquiries = async ({
  inquiryId,
  read,
  interest,
  date,
  page = 0,
  size = 20,
} = {}) => {
  const response = await httpClient.get("/admin/inquiries", {
    params: { inquiryId, read, interest, date, page, size },
  });
  // Backend wraps in ApiResponseDTO { success, message, data: Page<FollowerInquiry> }
  // Page shape: { content: [], totalPages, totalElements, number (currentPage), ... }
  const data = response.data?.data ?? response.data;
  return {
    content: data?.content ?? (Array.isArray(data) ? data : []),
    totalPages: data?.totalPages ?? 1,
    currentPage: data?.number ?? 0,
    totalElements: data?.totalElements ?? 0,
  };
};

export const fetchInquiryById = async (inquiryId) => {
  const response = await httpClient.get("/admin/inquiries", {
    params: { inquiryId },
  });
  // Backend returns ApiResponseDTO { success, message, data: Page<FollowerInquiry> }
  // Page object has shape: { content: [...], totalPages, totalElements, number, ... }
  const data = response.data?.data;

  // Extract inquiry from Page.content array
  if (data?.content && Array.isArray(data.content)) {
    return data.content[0];
  }

  // Fallback for direct inquiry response
  return Array.isArray(data) ? data[0] : data;
};

export const markInquiryRead = async (inquiryId) => {
  // AdminInquiryController.readReplyInquiries: PUT /admin/inquiries/{inquiryId}
  const response = await httpClient.put(`/admin/inquiries/${inquiryId}`);
  return response.data?.data ?? response.data;
};

export const respondToInquiry = async (inquiryId, message) => {
  // AdminInquiryController.readReplyInquiries: PUT /admin/inquiries/{inquiryId}?message=
  const response = await httpClient.put(`/admin/inquiries/${inquiryId}`, null, {
    params: { message },
  });
  return response.data?.data ?? response.data;
};

export const deleteInquiry = async (inquiryId) => {
  // AdminInquiryController: DELETE /admin/inquiries/{inquiryId}
  const response = await httpClient.delete(`/admin/inquiries/${inquiryId}`);
  return response.data;
};

export const bulkMarkInquiriesRead = async (ids) => {
  const response = await httpClient.put('/admin/inquiries/bulk/read', ids);
  return response.data;
};

export const bulkDeleteInquiries = async (ids) => {
  const response = await httpClient.delete('/admin/inquiries/bulk', {
    data: ids
  });
  return response.data;
};
