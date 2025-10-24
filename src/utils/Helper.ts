export const getFieldError = (fieldName: string, errors: any[]) => {
  // Check that error exists and is actually an array
  if (!errors || !Array.isArray(errors) || errors.length === 0) return "";

  // Now TypeScript knows error is an array
  const fieldError = errors.find((err) => err.field === fieldName);

  return fieldError ? fieldError.message : "";
};
