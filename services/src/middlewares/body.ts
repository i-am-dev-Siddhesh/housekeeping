import { NextFunction, Request, Response } from "express";
import { createWorkerSchema } from "../validations/admin.validation";


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

// export function convertStringPropertiesToIntegerMiddleware(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const schema = createWorkerSchema

//   let data = req.body;
//   for (let key in data) {
//     data[key] = parseJSONOrString(data[key]);
//     // @ts-ignore
//     const field = schema._ids._byKey.get(key);
//     if (field && field.schema.type === "number" && /^\d+$/.test(data[key])) {
//       const parsedValue = parseInt(data[key]);
//       if (!isNaN(parsedValue)) {
//         data[key] = parsedValue;
//       } else {
//         data[key] = null;
//       }
//     }
//   }
//   req.body = data;
//   next();
// }



export function convertStringPropertiesToIntegerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = createWorkerSchema;

  let data = req.body;
  for (let key in data) {
    data[key] = parseJSONOrString(data[key]);
    // @ts-ignore
    const field = schema._ids._byKey.get(key);
    
    if (field) {
      if (field.schema.type === 'number' && /^\d+$/.test(data[key])) {
        const parsedValue = parseInt(data[key]);
        if (!isNaN(parsedValue)) {
          data[key] = parsedValue;
        } else {
          data[key] = null;
        }
      } else if (field.schema.type === 'date') {
        const parsedDate = new Date(data[key]);
        if (!isNaN(parsedDate.getTime())) {
          data[key] = parsedDate;
        } else {
          data[key] = null;
        }
      }
    }
  }

  req.body = data;
  next();
}