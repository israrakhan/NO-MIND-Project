import { useState } from "react";
import { toast } from "sonner";

/**
 * Custom hook for handling form submission with field-level validation and toast notifications
 * @param {Function} onSubmit - Async function that handles the API call
 * @param {Function} onSuccess - Callback function after successful submission
 * @param {Array<string>} requiredFields - Array of field names that are required
 * @returns {Object} Form handler utilities
 */
export const useFormHandler = (onSubmit, onSuccess, requiredFields = [], successMessage = "Operation completed successfully!") => {
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateFields = (formData) => {
    const errors = {};

    for (const field of requiredFields) {
      if (!formData[field] || (typeof formData[field] === 'string' && !formData[field].trim())) {
        errors[field] = `${field.replace(/([A-Z])/g, ' $1').trim()} is required`;
      }
    }

    return errors;
  };

  const handleSubmit = async (e, formData, additionalValidation = null) => {
    e?.preventDefault?.();
    setFieldErrors({});
    setGeneralError("");
    setIsLoading(true);

    try {
      // Combine custom validation and required field validation errors
      let combinedErrors = {};

      if (additionalValidation) {
        const customErrors = (await additionalValidation(formData)) || {};
        combinedErrors = { ...combinedErrors, ...customErrors };
      }

      const requiredErrors = validateFields(formData);
      combinedErrors = { ...combinedErrors, ...requiredErrors };

      if (Object.keys(combinedErrors).length > 0) {
        setFieldErrors(combinedErrors);
        if (Object.keys(requiredErrors).length > 0) {
          toast.error("Please fill in all required fields");
        } else {
          toast.error("Please resolve the errors to continue");
        }
        setIsLoading(false);
        return;
      }

      // Call the submit function
      await onSubmit(formData);

      // Show success toast
      toast.success(successMessage);

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      const serverData = error?.response?.data;
      const rawMessage =
        serverData?.details?.message ||
        serverData?.message ||
        error?.message ||
        "An error occurred while processing your request";

      // Check if server returned field-specific errors object
      if (serverData && typeof serverData === 'object' && !serverData.message && !Array.isArray(serverData)) {
        setFieldErrors(serverData);
        toast.error("Please fix the highlighted errors");
        return;
      }

      // Sanitize raw SQL/database error messages
      const sanitizeResult = (msg) => {
        const strMsg = String(msg || "");
        if (
          strMsg.includes("Data truncation") ||
          strMsg.includes("Data too long") ||
          strMsg.includes("could not execute statement") ||
          strMsg.includes("SQL [") ||
          strMsg.includes("ConstraintViolationException") ||
          strMsg.includes("DataIntegrityViolationException")
        ) {
          const columnMatch = strMsg.match(/column '([a-zA-Z0-9_]+)'/i);
          if (columnMatch) {
            const colName = columnMatch[1];
            const friendlyName = colName.charAt(0).toUpperCase() + colName.slice(1);
            return {
              field: colName,
              error: `${friendlyName} text exceeds maximum allowed length. Please shorten your input.`,
            };
          }
          return {
            general: "One or more fields exceed the maximum allowed text length. Please shorten your input and try again.",
          };
        }

        const fieldMatch = strMsg.match(/^([a-zA-Z0-9_]+):\s*(.+)$/);
        if (fieldMatch) {
          const fieldName = fieldMatch[1];
          const fieldMsg = fieldMatch[2];
          if (
            fieldMsg.includes("could not execute statement") ||
            fieldMsg.includes("Data truncation") ||
            fieldMsg.includes("Data too long") ||
            fieldMsg.includes("SQL [")
          ) {
            const friendlyField = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
            return {
              field: fieldName,
              error: `${friendlyField} text exceeds maximum allowed length. Please shorten your text.`,
            };
          }
          return { field: fieldName, error: fieldMsg };
        }

        if (strMsg.toLowerCase().includes("phone")) {
          return { field: "phone", error: strMsg };
        }
        if (strMsg.toLowerCase().includes("email")) {
          return { field: "email", error: strMsg };
        }

        return { general: strMsg };
      };

      const { field, error: fieldErrMsg, general: genErrMsg } = sanitizeResult(rawMessage);

      if (field && fieldErrMsg) {
        setFieldErrors({ [field]: fieldErrMsg });
        toast.error(fieldErrMsg);
      } else {
        setGeneralError(genErrMsg);
        toast.error(genErrMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const setFieldError = (fieldName, errorMessage) => {
    setFieldErrors((prev) => ({
      ...prev,
      [fieldName]: errorMessage,
    }));
  };

  const clearFieldError = (fieldName) => {
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  return {
    fieldErrors,
    generalError,
    isLoading,
    handleSubmit,
    setFieldError,
    clearFieldError,
    setFieldErrors,
  };
};
