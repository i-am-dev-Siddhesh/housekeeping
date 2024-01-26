import { NextFunction, Request, Response } from "express";
import {
  cattleCreateValidation,
  cattleUpdateValidation,
} from "../validations/cattle.validation";

function parseJSONOrString(str: string) {
  let result;
  try {
    result = JSON.parse(str);
  } catch (error) {
    // Parsing failed, treat the input as a regular string
    result = str;
  }
  return result;
}

export function convertStringPropertiesToIntegerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = req.route.path.startsWith("/add")
    ? cattleUpdateValidation
    : cattleCreateValidation;

  let data = req.body;
  for (let key in data) {
    data[key] = parseJSONOrString(data[key]);
    // @ts-ignore
    const field = schema._ids._byKey.get(key);
    if (field && field.schema.type === "number" && /^\d+$/.test(data[key])) {
      const parsedValue = parseInt(data[key]);
      if (!isNaN(parsedValue)) {
        data[key] = parsedValue;
      } else {
        data[key] = null;
      }
    }
  }
  req.body = data;
  next();
}
