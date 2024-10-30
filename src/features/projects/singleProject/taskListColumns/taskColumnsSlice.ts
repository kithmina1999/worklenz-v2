import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type projectViewTaskListColumnsState = {
  columnsVisibility: {
    selector: boolean;
    taskId: boolean;
    task: boolean;
    description: boolean;
    progress: boolean;
    members: boolean;
    labels: boolean;
    phases: boolean;
    status: boolean;
    priority: boolean;
    timeTracking: boolean;
    estimation: boolean;
    startDate: boolean;
    dueDate: boolean;
    completedDate: boolean;
    createdDate: boolean;
    lastUpdated: boolean;
    reporter: boolean;
  };
};

const initialState: projectViewTaskListColumnsState = {
  columnsVisibility: {
    selector: true,
    taskId: true,
    task: true,
    description: true,
    progress: true,
    members: true,
    labels: true,
    phases: true,
    status: true,
    priority: true,
    timeTracking: true,
    estimation: true,
    startDate: true,
    dueDate: true,
    completedDate: true,
    createdDate: true,
    lastUpdated: true,
    reporter: true,
  },
};

const projectViewTaskListColumnsSlice = createSlice({
  name: 'projectViewTaskListColumnsReducer',
  initialState,
  reducers: {
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      const columnKey =
        action.payload as keyof projectViewTaskListColumnsState['columnsVisibility'];
      state.columnsVisibility[columnKey] = !state.columnsVisibility[columnKey];
    },
  },
});

export const { toggleColumnVisibility } =
  projectViewTaskListColumnsSlice.actions;
export default projectViewTaskListColumnsSlice.reducer;
