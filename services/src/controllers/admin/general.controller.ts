import { Request, Response } from 'express';
import { prisma } from '../../clients/prisma';
import { generateDefaultSlots, hashString } from '../../utils';
import {
  generalError,
  generalErrorStatusCode,
} from '../../utils/errorResponse';

// @desc    Create worker from admin
// @route   POST /v1/admin/worker/create
// @access  Protected
export const createWorkerAdmin = async (req: Request, res: Response) => {
  try {
    const admin = req.admin;
    const {
      name,
      phoneNumber,
      kycVerified,
      availableFrom,
      location,
      minimumRequiredMonthlyIncome,
      leavesTaken,
    } = req.body;

    let profileUrl = '';
    if (req.files) {
      //@ts-ignore
      const profileFiles = req.files.profile || [];
      if (profileFiles.length > 0) {
        console.log('profileFiles', profileFiles);
      }

      //@ts-ignore
      const aadhaarFiles = req.files.aadhaar || [];
      if (aadhaarFiles.length > 0) {
        console.log('aadhaarFiles', aadhaarFiles);
      }

      // const result = await uploadToS3(req.file);
      // profileUrl = result.Location;
    }

    const newWorker = await prisma.worker.create({
      data: {
        name,
        phoneNumber: String(phoneNumber),
        kycVerified,
        availableFrom: new Date(availableFrom),
        location,
        minimumRequiredMonthlyIncome,
        leavesTaken,
        profileUrl,
        addedById: admin.id,
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

// @desc    Update worker from admin
// @route   PUT /v1/admin/worker/update/:workerId
// @access  Protected
export const updateWorkerAdmin = async (req: Request, res: Response) => {
  try {
    const admin = req.admin;
    const { workerId } = req.params;
    let { phoneNumber, reason, ...rest } = req.body;
    if (phoneNumber) {
      phoneNumber = String(phoneNumber);
      rest = {
        ...rest,
        phoneNumber,
      };
    }

    if (req.files) {
      //@ts-ignore
      const profileFiles = req.files.profile || [];
      if (profileFiles.length > 0) {
        console.log('profileFiles', profileFiles);
        // Handle file upload and update profileUrl accordingly
      }

      //@ts-ignore
      const aadhaarFiles = req.files.aadhaar || [];
      if (aadhaarFiles.length > 0) {
        console.log('aadhaarFiles', aadhaarFiles);
        // Handle file upload for Aadhaar and update accordingly
      }
    }

    // Create a new worker updation history
    const workerUpdation = await prisma.workerUpdationHistory.create({
      data: {
        reason,
        admin: {
          connect: {
            id: admin.id,
          },
        },
        worker: {
          connect: {
            id: +workerId,
          },
        },
      },
    });

    const updatedWorker = await prisma.worker.update({
      where: {
        id: +workerId,
      },
      data: {
        updations: {
          connect: {
            id: workerUpdation.id,
          },
        },
        ...rest,
      },
      include: {
        slots: true,
      },
    });

    return res.status(200).json({ status: true, data: updatedWorker });
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
        updations: true,
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
// @route   GET /v1/admin/worker/all
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

// @desc    Create customer from admin
// @route   POST /v1/admin/customer/create
// @access  Protected
export const createCustomerAdmin = async (req: Request, res: Response) => {
  try {
    let { name, phoneNumber, email, location, password } = req.body;
    password = await hashString(password);
    let profileUrl = '';
    if (req.files) {
      //@ts-ignore
      const profileFiles = req.files.profile || [];
      if (profileFiles.length > 0) {
        console.log('profileFiles', profileFiles);
      }
    }

    const newCustomer = await prisma.customer.create({
      data: {
        name,
        password,
        email,
        phoneNumber: String(phoneNumber),
        location,
        profileUrl,
      },
    });

    return res.status(200).json({ status: true, data: newCustomer });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Update customer from admin
// @route   PUT /v1/admin/customer/update/:customerId
// @access  Protected
export const updateCustomerAdmin = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    let { phoneNumber, password, ...rest } = req.body;
    if (phoneNumber) {
      phoneNumber = String(phoneNumber);
      rest = {
        ...rest,
        phoneNumber,
      };
    }
    if (password) {
      password = await hashString(password);
      rest = {
        ...rest,
        password,
      };
    }

    if (req.files) {
      //@ts-ignore
      const profileFiles = req.files.profile || [];
      if (profileFiles.length > 0) {
        console.log('profileFiles', profileFiles);
        // Handle file upload and update profileUrl accordingly
      }
    }
    const updatedCustomer = await prisma.customer.update({
      where: {
        id: +customerId,
      },
      data: {
        ...rest,
      },
    });

    return res.status(200).json({ status: true, data: updatedCustomer });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Find worker from admin
// @route   GET /v1/admin/customer/:customerId
// @access  Protected
export const findCustomerForAdmin = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.customerId;
    // Fetch worker data by phone number
    const customer = await prisma.customer.findUnique({
      where: {
        id: +customerId,
      },
      include: {
        orders: true,
      },
    });

    if (!customer) {
      throw {
        statusCode: 404,
        message: 'Customer not found',
      };
    }

    return res.status(200).json({ status: true, data: customer });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Find customer from admin with pagination
// @route   GET /v1/admin/customer/all
// @query   page (optional) - Page number (default: 1)
// @query   pageSize (optional) - Number of items per page (default: 10)
// @access  Protected
export const findCustomersForAdmin = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

    const skip = (page - 1) * pageSize;

    // Fetch customers with pagination
    const customers = await prisma.customer.findMany({
      skip,
      take: pageSize,
    });

    return res.status(200).json({ status: true, data: customers });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};
