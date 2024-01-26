import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

const selectCattleState = (state: RootState) => state.worker;

export const selectCattles = createSelector(
  selectCattleState,
  (worker) => worker.cattles
);

export const selectSingleCattle = (cattleId: number) =>
  createSelector(selectCattleState, (worker) => {    
    return (
      worker?.cattles?.find((item) => {
        return item?.id === cattleId;
      }) || null
    );
  });
