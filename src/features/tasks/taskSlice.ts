import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskType } from '../../types/task.types';
import { MemberType } from '../../types/member.types';
import { LabelType } from '../../types/label.type';

type TaskState = {
  tasks: TaskType[];
  isCreateTaskDrawerOpen: boolean;
  isUpdateTaskDrawerOpen: boolean;
};

const initialState: TaskState = {
  isCreateTaskDrawerOpen: false,
  isUpdateTaskDrawerOpen: false,
  tasks: [],
};

const taskSlice = createSlice({
  name: 'taskReducer',
  initialState,
  reducers: {
    // create drawer toggle
    toggleCreateTaskDrawer: (state) => {
      state.isCreateTaskDrawerOpen
        ? (state.isCreateTaskDrawerOpen = false)
        : (state.isCreateTaskDrawerOpen = true);
    },
    // update drawer toggle
    toggleUpdateTaskDrawer: (state) => {
      state.isUpdateTaskDrawerOpen
        ? (state.isUpdateTaskDrawerOpen = false)
        : (state.isUpdateTaskDrawerOpen = true);
    },

    // task crud
    addTask: (state, action: PayloadAction<TaskType>) => {
      state.tasks.push(action.payload);
    },

    addTaskToTop: (state, action: PayloadAction<TaskType>) => {
      state.tasks.unshift(action.payload);
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(
        (task) => task.taskId !== action.payload
      );
    },

    // update specific items
    // add or remove members to the task
    toggleMember: (
      state,
      action: PayloadAction<{ taskId: string; member: MemberType }>
    ) => {
      const { taskId, member } = action.payload;
      const task = state.tasks.find((task) => task.taskId === taskId);
      if (task) {
        const memberExists = task.members?.some(
          (existingMember) => existingMember.memberId === member.memberId
        );
        task.members = memberExists
          ? task.members?.filter(
              (existingMember) => existingMember.memberId !== member.memberId
            )
          : [...(task.members || []), member];
      }
    },
    // add or remove labels to the task
    toggleLabel: (
      state,
      action: PayloadAction<{ taskId: string; label: LabelType }>
    ) => {
      const { taskId, label } = action.payload;
      const task = state.tasks.find((task) => task.taskId === taskId);
      if (task) {
        const labelExists = task.labels?.some(
          (existingLabel) => existingLabel.labelId === label.labelId
        );
        task.labels = labelExists
          ? task.labels?.filter(
              (existingLabel) => existingLabel.labelId !== label.labelId
            )
          : [...(task.labels || []), label];
      }
    },
  },
});

export const {
  toggleCreateTaskDrawer,
  toggleUpdateTaskDrawer,
  addTask,
  deleteTask,
  toggleMember,
  toggleLabel,
  addTaskToTop,
} = taskSlice.actions;

export default taskSlice.reducer;
