import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CreateCardState {
  taskCardDisabledStatus: { [status: string]: { top: boolean; bottom: boolean } };
}

const initialState: CreateCardState = {
  taskCardDisabledStatus: {},
};

const createCardSlice = createSlice({
  name: 'createCard',
  initialState,
  reducers: {
    initializeStatus(state, action: PayloadAction<string>) {
      const status = action.payload;
      if (!state.taskCardDisabledStatus[status]) {
        state.taskCardDisabledStatus[status] = { top: true, bottom: true };
      }
    },
    setTaskCardDisabled: (
      state,
      action: PayloadAction<{ status: string; position: 'top' | 'bottom'; disabled: boolean }>
    ) => {
      const { status, position, disabled } = action.payload;
      if (!state.taskCardDisabledStatus[status]) {
        state.taskCardDisabledStatus[status] = { top: true, bottom: true };
      }
      state.taskCardDisabledStatus[status][position] = disabled;
    },
  },
});

export const { setTaskCardDisabled, initializeStatus } = createCardSlice.actions;
export default createCardSlice.reducer;