import { PAGE_DATA_COUNT } from '@/utils/constant';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IState {
  isLoading: boolean;
  workers: any[];
  count: number;
  take: number;
  skip: number;
}

const initialState: IState = {
  isLoading: false,
  workers: [],
  count: 0,
  take: PAGE_DATA_COUNT,
  skip: 0,
};

export const worker = createSlice({
  name: 'worker',
  initialState,
  reducers: {
    setWorkers: (
      state,
      action: PayloadAction<{ data: any[]; count: number }>
    ) => {
      state.isLoading = false;
      state.workers = action.payload.data;
      state.count = action.payload.count;
    },

    addWorker: (state, action: PayloadAction<{ data: any }>) => {
      state.isLoading = false;
      state.workers = [...state.workers, action.payload.data];
      state.count = state.count + 1;
    },

    updateWorker: (state, action: PayloadAction<{ data: any }>) => {
      state.workers = state.workers.map((item) => {
        if (item.id === action.payload.data.id) return action.payload.data;
        return item;
      });
    },

    setWorkerIsLoading: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      state.isLoading = action.payload.isLoading;
    },
    setTakeAndSkip: (
      state,
      action: PayloadAction<{ take?: number; skip: number }>
    ) => {
      if (action.payload.take) {
        state.take = action.payload.take;
      }
      state.skip = action.payload.skip;
    },
  },
});

export const {
  setWorkers,
  setWorkerIsLoading,
  setTakeAndSkip,
  addWorker,
  updateWorker,
} = worker.actions;

export default worker.reducer;
