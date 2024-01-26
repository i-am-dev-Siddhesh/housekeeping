import { Request, Response } from 'express';
import { prisma } from '../../clients/prisma';
import { generateDefaultSlots } from '../../utils';
import {
  generalError,
  generalErrorStatusCode,
} from '../../utils/errorResponse';
import { uploadToS3 } from '../../clients/s3';

// @desc    Create worker from admin
// @route   POST /v1/admin/worker/create
// @access  Protected
export const createWorkerAdmin = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      kycVerified,
      availableFrom,
      location,
      minimumRequiredMonthlyIncome,
      leavesTaken,
    } = req.body;

    let profileUrl = '';
    if (req.file) {
      console.log('req.file,req.file', req.file);

      // const result = await uploadToS3(req.file);
      // profileUrl = result.Location;
    }

    const newWorker = await prisma.worker.create({
      data: {
        name,
        email,
        phoneNumber,
        kycVerified,
        availableFrom,
        location,
        minimumRequiredMonthlyIncome,
        leavesTaken,
        profileUrl,
        slots: {
          createMany: {
            data: generateDefaultSlots(),
          },
        },
      },
      include: {
        slots: true,
      },
    });

    return res.status(200).json({ status: true, data: newWorker });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Find worker from admin
// @route   GET /v1/admin/worker/:phoneNumber
// @access  Protected
export const findWorkerForAdmin = async (req: Request, res: Response) => {
  try {
    const phoneNumber = req.params.phoneNumber;
    // Fetch worker data by phone number
    const worker = await prisma.worker.findUnique({
      where: {
        phoneNumber,
      },
      include: {
        slots: true,
        orders: true,
        // Include other related data as needed
      },
    });

    if (!worker) {
      throw {
        statusCode: 404,
        message: 'Worker not found',
      };
    }

    return res.status(200).json({ status: true, data: worker });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Find worker from admin with pagination
// @route   GET /v1/admin/worker/
// @query   page (optional) - Page number (default: 1)
// @query   pageSize (optional) - Number of items per page (default: 10)
// @access  Protected
export const findWorkersForAdmin = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

    const skip = (page - 1) * pageSize;

    // Fetch workers with pagination
    const workers = await prisma.worker.findMany({
      skip,
      take: pageSize,
    });

    return res.status(200).json({ status: true, data: workers });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};