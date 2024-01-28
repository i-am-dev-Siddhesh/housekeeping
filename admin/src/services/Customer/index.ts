import { formDataPost, formDataPut, get, post } from '@/services/serverConfig';
import Services from '../serviceUrls';
import { ICreateCustomer, ICustomer, IUpdateCustomer } from '@/types/global';

function getCustomers(data: {
  pageIndex: number;
  pageSize: number;
}): Promise<any> {
  return get(
    Services.customers + `?page=${data.pageIndex}&pageSize=${data.pageSize}`
  );
}

function getSingleCustomer(userId: number | string): Promise<any> {
  return get(`${Services.customer}/${userId}`, {});
}

function createWorker(data: any): Promise<ICreateCustomer> {
  return formDataPost(Services.createCustomer, {}, data);
}

function updateCustomer(customerId: number, data: IUpdateCustomer): Promise<any> {
  return formDataPut(Services.updateCustomer + '/' + customerId, {}, data);
}

const CustomerService = {
  getCustomers,
  getSingleCustomer,
  createWorker,
  updateCustomer,
};

export default CustomerService;
