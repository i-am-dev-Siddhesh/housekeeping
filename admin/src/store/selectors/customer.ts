import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

const selectCustomerState = (state: RootState) => state.customer;

export const selectCustomers = createSelector(
  selectCustomerState,
  (customer) => customer.customers
);

export const selectSingleCustomer = (CustomerId: number) =>
  createSelector(selectCustomerState, (customer) => {
    return (
      customer?.customers?.find((item) => {
        return item?.id === CustomerId;
      }) || null
    );
  });
