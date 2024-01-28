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
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../components/CustomTable';
import CreateUpdateCustomerModal from '../../components/Forms/CreateUpdateCustomerModal';
import { selectCustomers } from '@/store/selectors/customer';
import CustomerService from '@/services/Customer';
import { setCustomerIsLoading, setCustomers } from '@/store/reducers/customer.reducer';

const CustomerShower = () => {
  const dispatch = useDispatch();
  const customers = useSelector(selectCustomers);
  const isLoading = useSelector(selectWorkersLoading);
  const count = useSelector(selectWorkersCount);
  const [customer, setCustomer] = useState()

  const fetchData = async (pageIndex: number, pageSize: number) => {
    try {
      if (isLoading) {
        return;
      }
      dispatch(setCustomerIsLoading({ isLoading: true }));
      const resp = await CustomerService.getCustomers({
        pageIndex,
        pageSize,
      });
      dispatch(setCustomers({ data: resp.data, count: resp.count }));
    } catch (_err) {
    } finally {
      dispatch(setCustomerIsLoading({ isLoading: false }));
    }
  };

  return (
    <>
      <CustomTable
        fetchData={fetchData}
        count={count}
        data={customers}
        isLoading={isLoading}
        columns={WorkerColumns}
        customRowProps={{ handleUpdateCustomer: setCustomer }}
      />
      <CreateUpdateCustomerModal customer={customer} isOpen={customer ? true : false} handleCloseModal={() => setCustomer(undefined)} />
    </>
  );
};

export default CustomerShower;
