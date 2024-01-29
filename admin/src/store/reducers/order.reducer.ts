import { IOrder } from '@/types/global';
import { PAGE_DATA_COUNT } from '@/utils/constant';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IState {
  isLoading: boolean;
  orders: IOrder[];
  count: number;
  take: number;
  skip: number;
}

const initialState: IState = {
  isLoading: false,
  orders: [],
  count: 0,
  take: PAGE_DATA_COUNT,
  skip: 0,
};

export const order = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (
      state,
      action: PayloadAction<{ data: any[]; count: number }>
    ) => {
      state.isLoading = false;
      state.orders = action.payload.data;
      state.count = action.payload.count;
    },

    addOrder: (state, action: PayloadAction<{ data: any }>) => {
      state.isLoading = false;
      state.orders = [...state.orders, action.payload.data];
      state.count = state.count + 1;
    },

    updateOrder: (state, action: PayloadAction<{ data: any }>) => {
      state.orders = state.orders.map((item) => {
        if (item.id === action.payload.data.id) return action.payload.data;
        return item;
      });
    },

    setOrderIsLoading: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const {
  setOrders,
  setOrderIsLoading,
  addOrder,
  updateOrder,
} = order.actions;

export default order.reducer;
