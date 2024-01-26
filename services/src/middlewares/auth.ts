import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../clients/prisma';
import { decodeJWTToken } from '../utils/auth';
import { forbiddenError, generalError } from '../utils/errorResponse';
import { IAdmin } from '../utils/types';

export const checkApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const apiKey = process.env.API_KEY as string;

    if (!req.headers.apikey || req?.headers?.apikey !== apiKey) {
      return res.status(403).json(forbiddenError());
    }

    return next();
  } catch (error: any) {
    return res.status(500).json(generalError(error));
  }
};

export const checkUserButStillAllowRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (authorization || authorization?.startsWith('Bearer ')) {
      const idToken = authorization.split('Bearer ')[1];

      const decoded: any = decodeJWTToken(idToken, 'user');

      if (decoded) {
        const phoneNumber = decoded?.phoneNumber.replace('+91', '');
        const user = (await prisma.customer.findUnique({
          where: {
            phoneNumber,
          },
        })) as any;

        req.user = user;
      }
    }
    next();
  } catch (error) {
    return res.status(401).json(forbiddenError());
  }
};

export const checkAdminToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req?.cookies?.auth?.token;
    if (!token) {
      throw {
        message: 'Unauthorized',
      };
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_ADMIN_TOKEN_SECRET!
    ) as IAdmin;

    const admin = (await prisma.admin.findUnique({
      where: {
        id: decoded?.id!,
      },
    })) as IAdmin | null;

    if (!admin) {
      throw {
        status_code: 404,
        message: 'Admin not found',
      };
    }
    req.admin = admin;
  } catch (error) {
    return res.status(401).json(forbiddenError());
  }
  next();
};

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Error('Unauthorized');
    }

    const idToken = authorization.split('Bearer ')[1];
    const decoded: any = decodeJWTToken(idToken, 'user');

    const phoneNumber = decoded?.phoneNumber.replace('+91', '');
    const user = (await prisma.worker.findUnique({
      where: {
        phoneNumber,
      },
    })) as any;
    if (!user) {
      throw {
        message: 'User not found!!!',
      };
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(forbiddenError());
  }
};

export const checkIpLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ipAddress = req.ip || req.connection.remoteAddress;
    // @ts-ignore
    req.ipAddress = ipAddress;
    next();
  } catch (error) {
    return res.status(401).json(forbiddenError());
  }
};
