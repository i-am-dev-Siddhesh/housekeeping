import WorkerColumns from '@/datatables/WorkerColumns';
import WorkerService from '@/services/Worker';
import {
  setWorkerIsLoading,
  setWorkers,
} from '@/store/reducers/worker.reducer';
import {
  selectWorkers,
  selectWorkersCount,
  selectWorkersLoading,
} from '@/store/selectors/worker';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../CustomTable';

const WorkerShower = () => {
  const dispatch = useDispatch();
  const workers = useSelector(selectWorkers);
  const isLoading = useSelector(selectWorkersLoading);
  const count = useSelector(selectWorkersCount);

  const fetchData = async (pageIndex: number, pageSize: number) => {
    try {
      if (isLoading) {
        return;
      }
      dispatch(setWorkerIsLoading({ isLoading: true }));
      const resp = await WorkerService.getWorkers({
        pageIndex,
        pageSize,
      });
      dispatch(setWorkers({ data: resp.data, count: resp.count }));
    } catch (_err) {
    } finally {
      dispatch(setWorkerIsLoading({ isLoading: false }));
    }
  };

  return (
    <CustomTable
      fetchData={fetchData}
      count={count}
      data={workers}
      isLoading={isLoading}
      columns={WorkerColumns}
    />
  );
};

export default WorkerShower;
