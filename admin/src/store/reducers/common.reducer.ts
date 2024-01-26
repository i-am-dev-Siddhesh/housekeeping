import { IAdmin } from "@/types/admin";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IState {
  isProjectModalOpen: boolean;
}

const initialState: IState = {
  isProjectModalOpen: false,
};

export const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setProjectModal: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.isProjectModalOpen = action.payload.isOpen;
    },
  },
});

export const { setProjectModal } = common.actions;

export default common.reducer;
