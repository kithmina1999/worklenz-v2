import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TaskType } from '@/types/task.types';
import { MemberType } from '@/types/member.types';
import { ITaskListConfigV2, ITaskListGroup } from '@/types/tasks/taskList.types';
import { tasksApiService } from '@/api/tasks/tasks.api.service';
import logger from '@/utils/errorLogger';
import { ITaskLabel } from '@/types/label.type';

type TaskState = {
  search: string | null;
  archived: boolean;
  group: 'status' | 'priority' | 'phase';
  isSubtasksInclude: boolean;
  tasks: TaskType[];
  taskGroups: ITaskListGroup[];
  isCreateTaskDrawerOpen: boolean;
  isUpdateTaskDrawerOpen: boolean;
  loadingGroups: boolean;
  error: string | null;
};

const initialState: TaskState = {
  search: null,
  archived: false,
  group: 'phase',
  isSubtasksInclude: false,
  tasks: [],
  isCreateTaskDrawerOpen: false,
  isUpdateTaskDrawerOpen: false,
  taskGroups: [],
  loadingGroups: false,
  error: null
};

export const fetchTaskGroups = createAsyncThunk(
  'tasks/fetchTaskGroups',
  async (config: ITaskListConfigV2, { rejectWithValue }) => {
    try {
      const response = await tasksApiService.getTaskList(config);
      return response.body;
    } catch (error) {
      logger.error('Fetch Labels', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch labels');
    }
  }
);

const taskSlice = createSlice({
  name: 'taskReducer',
  initialState,
  reducers: {
    // create drawer toggle
    toggleCreateTaskDrawer: state => {
      state.isCreateTaskDrawerOpen
        ? (state.isCreateTaskDrawerOpen = false)
        : (state.isCreateTaskDrawerOpen = true);
    },
    // update drawer toggle
    toggleUpdateTaskDrawer: state => {
      state.isUpdateTaskDrawerOpen
        ? (state.isUpdateTaskDrawerOpen = false)
        : (state.isUpdateTaskDrawerOpen = true);
    },

    // task crud
    addTask: (state, action: PayloadAction<TaskType>) => {
      // state.tasks.push(action.payload);
    },

    addTaskToTop: (state, action: PayloadAction<TaskType>) => {
      // state.tasks.unshift(action.payload);
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      // state.tasks = state.tasks.filter(
      //   (task) => task.taskId !== action.payload
      // );
    },

    // update specific items
    // add or remove members to the task
    toggleMember: (state, action: PayloadAction<{ taskId: string; member: MemberType }>) => {
      // const { taskId, member } = action.payload;
      // const task = state.tasks.find((task) => task.taskId === taskId);
      // if (task) {
      //   const memberExists = task.members?.some(
      //     (existingMember) => existingMember.memberId === member.memberId
      //   );
      //   task.members = memberExists
      //     ? task.members?.filter(
      //         (existingMember) => existingMember.memberId !== member.memberId
      //       )
      //     : [...(task.members || []), member];
      // }
    },
    // add or remove labels to the task
    toggleLabel: (state, action: PayloadAction<{ taskId: string; label: ITaskLabel }>) => {
      // const { taskId, label } = action.payload;
      // const task = state.tasks.find((task) => task.taskId === taskId);
      // if (task) {
      //   const labelExists = task.labels?.some(
      //     (existingLabel) => existingLabel.labelId === label.labelId
      //   );
      //   task.labels = labelExists
      //     ? task.labels?.filter(
      //         (existingLabel) => existingLabel.labelId !== label.labelId
      //       )
      //     : [...(task.labels || []), label];
      // }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskGroups.pending, (state) => {
        state.loadingGroups = true;
        state.error = null;
      })
      .addCase(fetchTaskGroups.fulfilled, (state, action) => {
        state.loadingGroups = false;
        state.taskGroups = action.payload;
      })
      .addCase(fetchTaskGroups.rejected, (state, action) => {
        state.loadingGroups = false;
        state.error = action.error.message || 'Failed to fetch task groups';
      });
  }
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
