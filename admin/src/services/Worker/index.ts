import { formDataPost, formDataPut, get, post } from '@/services/serverConfig';
import Services from '../serviceUrls';

function getWorkers(data: {
  pageIndex: number;
  pageSize: number;
}): Promise<any> {
  return get(
    Services.workers + `?page=${data.pageIndex}&pageSize=${data.pageSize}`
  );
}

function getSingleWorker(userId: number | string): Promise<any> {
  return get(`${Services.worker}/${userId}`, {});
}

function createWorker(data: any): Promise<any> {
  return formDataPost(Services.createWorker, {}, data);
}

const WorkerService = {
  getWorkers,
  getSingleWorker,
  createWorker
};

export default WorkerService;
