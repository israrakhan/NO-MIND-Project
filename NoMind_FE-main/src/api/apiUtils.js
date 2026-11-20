/**
 * Handles paginated response from the backend and normalizes it.
 * @param {Object} response - The axios response object.
 * @returns {Object} Normalized pagination object.
 */
export const handlePaginatedResponse = (response) => {
  const data = response.data?.data ?? response.data;
  return {
    content: data?.content ?? (Array.isArray(data) ? data : []),
    totalPages: data?.totalPages ?? 1,
    currentPage: data?.number ?? 0,
    totalElements: data?.totalElements ?? 0,
  };
};

/**
 * Extracts data from a standard API response.
 * @param {Object} response - The axios response object.
 * @returns {*} The extracted data.
 */
export const extractData = (response) => {
  return response.data?.data ?? response.data;
};
