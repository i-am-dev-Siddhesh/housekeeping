import argon2 from 'argon2';
import { Request, Response } from 'express';
import { prisma } from '../../clients/prisma';
import { EMAIL_PASSWORD_INVALID } from '../../constants/messages';
import { createJWTToken } from '../../utils/auth';
import {
  generalError,
  generalErrorStatusCode,
} from '../../utils/errorResponse';

// @desc    GET Admin
// @route   GET /v1/auth/admin/me
// @access  Protected
export const adminMeApi = async (req: Request, res: Response) => {
  try {
    if (req.admin && req.admin.password) {
      // @ts-ignore
      delete req.admin.password;
    }
    return res.status(200).json({ status: true, data: req.admin });
  } catch (error: any) {
    let statusCode = 500;
    if (error.status_code) {
      statusCode = error.status_code;
    }
    return res.status(statusCode).json(generalError(error));
  }
};

// @desc    login admin
// @route   POST /v1/auth/admin/login
// @access  Public
export const adminLoginApi = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    let admin: any = await prisma.admin.findUnique({
      where: {
        email,
      },
    });
    if (!admin) {
      throw {
        message: EMAIL_PASSWORD_INVALID,
      };
    }

    const isValid = await argon2.verify(admin?.password!, password);

    if (!isValid) {
      throw {
        status_code: 404,
        message: EMAIL_PASSWORD_INVALID,
      };
    }

    const token = createJWTToken(
      {
        id: admin.id,
        email: admin?.email,
      },
      'admin'
    );

    res.cookie('auth', token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: process.env.DOMAIN,
    });

    delete admin.password;
    return res.status(200).json({ status: true, data: admin });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};
