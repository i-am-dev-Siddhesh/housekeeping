import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

const selectOrderState = (state: RootState) => state.order;

export const selectOrders = createSelector(
  selectOrderState,
  (order) => order.orders
);

export const selectSingleOrder = (orderId: number) =>
  createSelector(selectOrderState, (order) => {
    return (
      order?.orders?.find((item) => {
        return item?.id === orderId;
      }) || null
    );
  });

export const selectOrdersLoading = createSelector(
  selectOrderState,
  (order) => order.isLoading
);

export const selectOrdersCount = createSelector(
  selectOrderState,
  (order) => order.count
);
