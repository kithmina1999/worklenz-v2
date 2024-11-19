import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ColumnsVisibilityState = {
  [key: string]: boolean;
};

const initialState: ColumnsVisibilityState = {
  project: true,
  estimatedVsActual: true,
  tasksProgress: true,
  lastActivity: true,
  status: true,
  dates: true,
  daysLeft: true,
  projectHealth: true,
  category: true,
  projectUpdate: true,
  client: true,
  team: true,
  projectManager: true,
};

const projectReportsTableColumnsSlice = createSlice({
  name: 'projectReportsTableColumns',
  initialState,
  reducers: {
    toggleColumnHidden: (state, action: PayloadAction<string>) => {
      const columnKey = action.payload;
      if (columnKey in state) {
        state[columnKey] = !state[columnKey];
      }
    },
  },
});

export const { toggleColumnHidden } = projectReportsTableColumnsSlice.actions;
export default projectReportsTableColumnsSlice.reducer;
