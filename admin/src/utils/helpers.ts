import { useCallback } from "react";

export const errorFormatter = (error: any) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.response?.data?.data?.message ||
    error?.response?.data?.data?.error ||
    error?.message ||
    "Something went wrong";

  return message;
};


export const useYupValidationResolver = (validationSchema: any) =>
  useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors: any) {
        console.log('errors',errors);
                
        return {
          values: {},
          errors:errors?.inner?.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

  export const formatDate = (date: Date): string => {
    const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleString('en-IN', options);
  };
  

  