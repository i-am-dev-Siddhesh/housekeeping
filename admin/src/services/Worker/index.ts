import { get, post } from '@/services/serverConfig';
import Services from '../serviceUrls';

function getWorkers(data: {
  pageIndex: number;
  pageSize: number;
}): Promise<any> {
  return get(Services.workers+`?page=${data.pageIndex}&pageSize=${data.pageSize}`);
}

function getSingleWorker(userId: number | string): Promise<any> {
  return get(`${Services.worker}/${userId}`, {});
}

const WorkerService = {
  getWorkers,
  getSingleWorker,
};

export default WorkerService;
