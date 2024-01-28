import { Request, Response } from 'express';
import { prisma } from '../../clients/prisma';
import { hashString } from '../../utils';
import {
  generalError,
  generalErrorStatusCode,
} from '../../utils/errorResponse';

// @desc    Create order from admin
// @route   POST /v1/admin/order/create
// @access  Protected
export const createOrderAdmin = async (req: Request, res: Response) => {
  try {
    const newOrder = await prisma.order.create({
      data: {
        ...req.body,
      },
    });

    return res.status(200).json({ status: true, data: newOrder });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Update order from admin
// @route   PUT /v1/admin/order/update/:OrderId
// @access  Protected
export const updateOrderAdmin = async (req: Request, res: Response) => {
  try {
    const { OrderId } = req.params;
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
    const updatedOrder = await prisma.order.update({
      where: {
        id: +OrderId,
      },
      data: {
        ...rest,
      },
    });

    return res.status(200).json({ status: true, data: updatedOrder });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Find worker from admin
// @route   GET /v1/admin/order/:OrderId
// @access  Protected
export const findOrderForAdmin = async (req: Request, res: Response) => {
  try {
    const OrderId = req.params.OrderId;
    // Fetch worker data by phone number
    const order = await prisma.order.findUnique({
      where: {
        id: +OrderId,
      },
      include: {
        customer: true,
        slot: true,
      },
    });

    if (!order) {
      throw {
        statusCode: 404,
        message: 'Order not found',
      };
    }

    return res.status(200).json({ status: true, data: order });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Find order from admin with pagination
// @route   GET /v1/admin/order/all
// @query   page (optional) - Page number (default: 1)
// @query   pageSize (optional) - Number of items per page (default: 10)
// @access  Protected
export const findOrdersForAdmin = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

    const skip = (page - 1) * pageSize;

    // Fetch Orders with pagination
    const Orders = await prisma.order.findMany({
      skip,
      take: pageSize,
    });

    return res.status(200).json({ status: true, data: Orders });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};
