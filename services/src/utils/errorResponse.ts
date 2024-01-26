import {
  ACCESS_DENIED_MESSAGE,
  GENERAL_ERROR_MESSAGE,
  NOT_AUTHENTICATED_MESSAGE,
} from "../constants";

export class HttpException extends Error {
  public status: number;
  public message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const generalError = (error: HttpException) => {
  const message = error.message || GENERAL_ERROR_MESSAGE;
  return {
    status: false,
    error: message,
  };
};

export const generalErrorStatusCode = (error: any) => {
  const code = error?.statusCode || 500;
  return code;
};

export const forbiddenError = () => ({
  status: false,
  message: ACCESS_DENIED_MESSAGE,
});

export const notAuthenticatedError = () => ({
  status: false,
  message: NOT_AUTHENTICATED_MESSAGE,
});

function getReadablePrismaError(prismaError: any) {
  const errorMessage = prismaError.message;
  const regex =
    /Argument (\w+): Got invalid value '(.+)'(.+)Provided (\w+), expected (\w+)/g;
  let result;
  let errors = [];
  while ((result = regex.exec(errorMessage))) {
    errors.push({
      message: `Invalid value '${result[2]}'. Expected type: ${result[5]}.`,
      field: result[1],
    });
  }
  return errors;
}
