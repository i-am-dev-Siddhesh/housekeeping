import { IAdmin } from '@/types/admin';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface IState {
  isLoading: boolean;
  admin: IAdmin | null;
}

const initialState: IState = {
  isLoading: true,
  admin: null,
};

export const admin = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<{ data: IAdmin }>) => {
      state.isLoading = false;
      state.admin = action.payload.data;
    },
  },
});

export const { setAdmin } = admin.actions;

export default admin.reducer;
