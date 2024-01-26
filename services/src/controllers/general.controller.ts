import { Request, Response } from 'express';
import { generalError } from '../utils/errorResponse';
import { SERVER_RUNNING_MESSAGE } from '../constants';
import { prisma } from '../clients/prisma';

// @desc    Check Server Health
// @route   GET /v1/
// @access  Public
export const checkServerHealth = (_req: Request, res: Response) => {
  try {
    return res
      .status(200)
      .json({ status: true, message: SERVER_RUNNING_MESSAGE });
  } catch (error: any) {
    return res.status(500).json(generalError(error));
  }
};

// @desc    Check Play store app version
// @route   GET /v1/app-version
// @access  Public
export const checkAppVersion = async (_req: Request, res: Response) => {
  try {
    const common = await prisma.common.findFirst();
    return res.status(200).json({
      status: true,
      data: {
        play_store_app_version: common?.play_store_app_version,
        ios_store_app_version: '',
      },
    });
  } catch (error: any) {
    let statusCode = 500;
    if (error.status_code) {
      statusCode = error.status_code;
    }
    return res.status(statusCode).json(generalError(error));
  }
};

// @desc    Check Hash version
// @route   POST /v1/hash version
// @access  Public
export const checkHash = async (req: Request, res: Response) => {
  try {
    console.log('req. body hash', req?.body);
    console.log('req. query params', req?.query?.params);
    console.log('req. query hash', req?.query);
    return res.status(200).json({
      status: true,
    });
  } catch (error: any) {
    let statusCode = 500;
    if (error.status_code) {
      statusCode = error.status_code;
    }
    return res.status(statusCode).json(generalError(error));
  }
};
