import { httpClient } from "../../../api/httpClient";
import { handlePaginatedResponse, extractData } from "../../../api/apiUtils";

export const fetchBookings = async ({ page = 0, size = 20 } = {}) => {
  const response = await httpClient.get("/admin/bookings", {
    params: { page, size },
  });
  return handlePaginatedResponse(response);
};

export const fetchBookingById = async (bookingId) => {
  const response = await httpClient.get(`/admin/bookings/${bookingId}`);
  return extractData(response);
};

export const createBooking = async (bookingData) => {
  const response = await httpClient.post("/admin/bookings", bookingData);
  return response.data;
};

// updateBooking removed — AdminBookingController has no PUT endpoint.

export const deleteBooking = async (bookingId) => {
  const response = await httpClient.delete(`/admin/bookings/${bookingId}`);
  return response.data;
};

export const updateBookingStatus = async (bookingId, status) => {
  const response = await httpClient.patch(
    `/admin/bookings/${bookingId}/status`,
    null,
    {
      params: { status },
    },
  );
  return response.data;
};
