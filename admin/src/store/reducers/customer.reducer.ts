import { ICustomer } from '@/types/global';
import { PAGE_DATA_COUNT } from '@/utils/constant';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IState {
  isLoading: boolean;
  customers: ICustomer[];
  count: number;
  take: number;
  skip: number;
}

const initialState: IState = {
  isLoading: false,
  customers: [],
  count: 0,
  take: PAGE_DATA_COUNT,
  skip: 0,
};

export const customer = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomers: (
      state,
      action: PayloadAction<{ data: any[]; count: number }>
    ) => {
      state.isLoading = false;
      state.customers = action.payload.data;
      state.count = action.payload.count;
    },

    addCustomer: (state, action: PayloadAction<{ data: any }>) => {
      state.isLoading = false;
      state.customers = [...state.customers, action.payload.data];
      state.count = state.count + 1;
    },

    updateCustomer: (state, action: PayloadAction<{ data: any }>) => {
      state.customers = state.customers.map((item) => {
        if (item.id === action.payload.data.id) return action.payload.data;
        return item;
      });
    },

    setCustomerIsLoading: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const {
  setCustomers,
  setCustomerIsLoading,
  addCustomer,
  updateCustomer,
} = customer.actions;

export default customer.reducer;
