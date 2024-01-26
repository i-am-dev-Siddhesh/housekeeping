import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import adminRducer from './reducers/admin.reducer';
import commonReducer from './reducers/common.reducer';
import workerReducer from './reducers/worker.reducer';

const combinedReducer = combineReducers({
  admin: adminRducer,
  worker: workerReducer,
  common: commonReducer,
});

const masterReducer = (state: any, action: any) => {
  return combinedReducer(state, action);
};

const store = () =>
  configureStore({
    reducer: masterReducer,
  });

export type RootState = ReturnType<typeof masterReducer>;

export default createWrapper(store);
