import { Request, Response } from 'express';
import { prisma } from '../../clients/prisma';
import {
  generalError,
  generalErrorStatusCode,
} from '../../utils/errorResponse';
import { findAvailableWorkers } from '../../utils/order';

// @desc    Create order from admin
// @route   POST /v1/admin/order/create
// @access  Protected
export const createOrderAdmin = async (req: Request, res: Response) => {
  try {
    const { slots, ...data } = req.body;
    const availableWorkers = await findAvailableWorkers(slots);
    const randomIndex = Math.floor(Math.random() * availableWorkers.length);
    const chosenWorker = availableWorkers[randomIndex];

    const newOrder = await prisma.order.create({
      data: {
        ...data,
        slots: {
          connect: chosenWorker.slots,
        },
      },
    });

    return res.status(200).json({ status: true, data: newOrder });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Update order from admin
// @route   PUT /v1/admin/order/update/:orderId
// @access  Protected
export const updateOrderAdmin = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { slots, ...data } = req.body;

    if (slots) {
      const availableWorkers = await findAvailableWorkers(slots);
      const randomIndex = Math.floor(Math.random() * availableWorkers.length);
      const chosenWorker = availableWorkers[randomIndex];
      data.slots = {
        connect: chosenWorker.slots,
      };
    }

    const updatedOrder = await prisma.order.update({
      data,
      where: {
        id: +orderId,
      },
    });

    return res.status(200).json({ status: true, data: updatedOrder });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Find worker from admin
// @route   GET /v1/admin/order/:orderId
// @access  Protected
export const findOrderForAdmin = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const order = await prisma.order.findUnique({
      where: {
        id: +orderId,
      },
      include: {
        customer: true,
        slots: true,
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
