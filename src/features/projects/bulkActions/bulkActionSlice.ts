import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type BulkActionState = {
  selectedTaskIdsList: string[];
};

const initialState: BulkActionState = {
  selectedTaskIdsList: [],
};

const bulkActionSlice = createSlice({
  name: 'bulkActionReducer',
  initialState,
  reducers: {
    selectTaskIds: (state, action: PayloadAction<string[]>) => {
      state.selectedTaskIdsList.push(...action.payload);
    },
    deselectAll: state => {
      state.selectedTaskIdsList = [];
    },
  },
});

export const { selectTaskIds, deselectAll } = bulkActionSlice.actions;
export default bulkActionSlice.reducer;
