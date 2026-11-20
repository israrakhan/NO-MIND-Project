/**
 * Validates Year / Period field input.
 * Accepts:
 * - Single 4-digit year: e.g. "2015"
 * - 4-digit year range: e.g. "2010-2015" or "2010 - 2015"
 * - Year to Present: e.g. "2018-Present" or "2018 - present"
 * Rejects invalid two-digit year values like "01", "04", "15", or arbitrary invalid strings.
 *
 * @param {string} value
 * @returns {string|null} Error message string if invalid, or null if valid
 */
export const validateYearPeriod = (value) => {
  if (!value || typeof value !== "string" || !value.trim()) {
    return "Year / Period is required";
  }

  const trimmed = value.trim();

  // Pattern 1: Single 4-digit year (e.g., 2015)
  if (/^\d{4}$/.test(trimmed)) {
    const yearNum = parseInt(trimmed, 10);
    if (yearNum < 1800 || yearNum > 2100) {
      return "Year must be between 1800 and 2100";
    }
    return null;
  }

  // Pattern 2: 4-digit year range (e.g., 2010-2015 or 2010 - 2015)
  const rangeMatch = trimmed.match(/^(\d{4})\s*-\s*(\d{4})$/);
  if (rangeMatch) {
    const startYear = parseInt(rangeMatch[1], 10);
    const endYear = parseInt(rangeMatch[2], 10);

    if (startYear < 1800 || startYear > 2100 || endYear < 1800 || endYear > 2100) {
      return "Years in range must be between 1800 and 2100";
    }

    if (endYear < startYear) {
      return "End year must be greater than or equal to start year";
    }

    return null;
  }

  // Pattern 3: Year to Present (e.g., 2018-Present or 2018 - present)
  const presentMatch = trimmed.match(/^(\d{4})\s*-\s*present$/i);
  if (presentMatch) {
    const startYear = parseInt(presentMatch[1], 10);
    if (startYear < 1800 || startYear > 2100) {
      return "Start year must be between 1800 and 2100";
    }
    return null;
  }

  return "Please enter a valid 4-digit year (e.g., 2015) or range (e.g., 2010-2015, 2018-Present)";
};

/**
 * Validates Duration field input.
 * Accepts:
 * - Positive number followed by optional unit: e.g. "3 Months", "10", "6 Weeks"
 * Rejects negative numbers, special characters, and non-numeric starting values.
 */
export const validateDuration = (value) => {
  if (!value || typeof value !== "string" || !value.trim()) {
    return "Duration is required";
  }
  const match = value.trim().match(/^([1-9]\d{0,2})(?:\s+([A-Za-z]+))?$/);
  if (!match) {
    return "Please enter a valid positive duration (e.g., '3 Months', '10 Days')";
  }
  return null;
};
