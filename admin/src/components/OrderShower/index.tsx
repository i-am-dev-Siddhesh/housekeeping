import OrderColumns from '@/datatables/OrderColumns';
import OrderService from '@/services/Order';
import { setOrderIsLoading, setOrders } from '@/store/reducers/order.reducer';
import {
  selectOrders,
  selectOrdersCount,
  selectOrdersLoading,
} from '@/store/selectors/order';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../CustomTable';
import CreateUpdateOrderModal from '../Forms/CreateUpdateOrderModal';

const OrderShower = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectOrdersLoading);
  const count = useSelector(selectOrdersCount);
  const [order, setOrder] = useState();

  const fetchData = async (pageIndex: number, pageSize: number) => {
    try {
      if (isLoading) {
        return;
      }
      dispatch(setOrderIsLoading({ isLoading: true }));
      const resp = await OrderService.getOrders({
        pageIndex,
        pageSize,
      });
      dispatch(setOrders({ data: resp.data, count: resp.count }));
    } catch (_err) {
    } finally {
      dispatch(setOrderIsLoading({ isLoading: false }));
    }
  };

  return (
    <>
      <CustomTable
        fetchData={fetchData}
        count={count}
        data={orders}
        isLoading={isLoading}
        columns={OrderColumns}
        customRowProps={{ handleUpdateOrder: setOrder }}
      />
      <CreateUpdateOrderModal
        order={order}
        isOpen={order ? true : false}
        handleCloseModal={() => setOrder(undefined)}
      />
    </>
  );
};

export default OrderShower;
