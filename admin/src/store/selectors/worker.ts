import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

const selectWorkerState = (state: RootState) => state.worker;

export const selectWorkersLoading = createSelector(
  selectWorkerState,
  (worker) => worker.isLoading
);

export const selectWorkersCount = createSelector(
  selectWorkerState,
  (worker) => worker.count
);

export const selectWorkers = createSelector(
  selectWorkerState,
  (worker) => worker.workers
);

export const selectSingleWorker = (workerId: number) =>
  createSelector(selectWorkerState, (worker) => {
    return (
      worker?.workers?.find((item) => {
        return item?.id === workerId;
      }) || null
    );
  });
