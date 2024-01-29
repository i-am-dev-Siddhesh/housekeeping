import { get, post, put } from '@/services/serverConfig';
import { ICreateOrder } from '@/types/global';
import Services from '../serviceUrls';

function getOrders(data: {
  pageIndex: number;
  pageSize: number;
}): Promise<any> {
  return get(
    Services.orders + `?page=${data.pageIndex}&pageSize=${data.pageSize}`
  );
}

function getSingleOrder(orderId: number | string): Promise<any> {
  return get(`${Services.order}/${orderId}`, {});
}

function createOrder(data: any): Promise<ICreateOrder> {
  return post(Services.createOrder, {}, data);
}

function updateOrder(orderId: number, data: any): Promise<any> {
  return put(Services.updateOrder + '/' + orderId, {}, data);
}

const OrderService = {
  getOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
};

export default OrderService;
