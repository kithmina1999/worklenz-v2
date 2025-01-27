import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TaskType } from '@/types/task.types';
import { MemberType } from '@/types/member.types';
import { IGroupByOption, ITaskListColumn, ITaskListConfigV2, ITaskListGroup } from '@/types/tasks/taskList.types';
import { tasksApiService } from '@/api/tasks/tasks.api.service';
import logger from '@/utils/errorLogger';
import { ITaskLabel } from '@/types/label.type';
import { ITaskListMemberFilter } from '@/types/tasks/taskListFilters.types';
import produce from 'immer';
import { ITaskAssignee } from '@/types/tasks/task.types';
import { ITeamMemberViewModel } from '@/types/teamMembers/teamMembersGetResponse.types';

type TaskState = {
  search: string | null;
  archived: boolean;
  group: 'status' | 'priority' | 'phase';
  isSubtasksInclude: boolean;
  tasks: TaskType[];
  taskGroups: ITaskListGroup[];
  columns: ITaskListColumn[];
  selectedTask: TaskType | null;
  isTaskDrawerOpen: boolean;
  loadingGroups: boolean;
  error: string | null;
  taskAssignees: ITaskListMemberFilter[];
  loadingAssignees: boolean;
};

const initialState: TaskState = {
  search: null,
  archived: false,
  group: 'phase',
  isSubtasksInclude: false,
  tasks: [],
  columns: [],
  selectedTask: null,
  isTaskDrawerOpen: false,
  taskGroups: [],
  loadingGroups: false,
  error: null,
  taskAssignees: [],
  loadingAssignees: false
};

export const GROUP_BY_STATUS_VALUE = "status";
export const GROUP_BY_PRIORITY_VALUE = "priority";
export const GROUP_BY_PHASE_VALUE = "phase";

export const GROUP_BY_OPTIONS: IGroupByOption[] = [
  {label: "Status", value: GROUP_BY_STATUS_VALUE},
  {label: "Priority", value: GROUP_BY_PRIORITY_VALUE},
  {label: "Phase", value: GROUP_BY_PHASE_VALUE}
];

export const COLUMN_KEYS = {
  KEY: "KEY",
  NAME: "NAME",
  DESCRIPTION: "DESCRIPTION",
  PROGRESS: "PROGRESS",
  ASSIGNEES: "ASSIGNEES",
  LABELS: "LABELS",
  STATUS: "STATUS",
  PRIORITY: "PRIORITY",
  TIME_TRACKING: "TIME_TRACKING",
  ESTIMATION: "ESTIMATION",
  START_DATE: "START_DATE",
  DUE_DATE: "DUE_DATE",
  DUE_TIME: "DUE_TIME",
  COMPLETED_DATE: "COMPLETED_DATE",
  CREATED_DATE: "CREATED_DATE",
  LAST_UPDATED: "LAST_UPDATED",
  REPORTER: "REPORTER",
  PHASE: "PHASE"
};

export const COLUMN_KEYS_LIST = Object.values(COLUMN_KEYS).map(key => ({
  key,
  show: true
}));

export const getCurrentGroup = () => {
  const key = localStorage.getItem("worklenz.tasklist.group_by");
  if (key) {
    const g = GROUP_BY_OPTIONS.find(o => o.value === key);
    if (g)
      return g;
  }
  return GROUP_BY_OPTIONS[0];
} 

export const setCurrentGroup = (group: IGroupByOption) => {
  localStorage.setItem("worklenz.tasklist.group_by", group.value);
}

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

export const fetchTaskAssignees = createAsyncThunk(
  'tasks/fetchTaskAssignees',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await tasksApiService.fetchTaskAssignees(projectId);
      return response.body;
    } catch (error) {
      logger.error('Fetch Task Assignees', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch task assignees');
    }
  }
);

const taskSlice = createSlice({
  name: 'taskReducer',
  initialState,
  reducers: {
    toggleTaskDrawer: state => {
      state.isTaskDrawerOpen
        ? (state.isTaskDrawerOpen = false)
        : (state.isTaskDrawerOpen = true);
    },

    // task crud
    addTask: (state, action: PayloadAction<any>) => {
      const newTask = action.payload;
      console.log('addTask', newTask);
      const group = state.taskGroups.find(group => group.id === newTask.groupId);
      if (group) {
        const taskExists = group.tasks.some(task => task.id === newTask.id);
        if (!taskExists) {
          group.tasks.push(newTask);
        }
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      // state.tasks = state.tasks.filter(
      //   (task) => task.taskId !== action.payload
      // );
    },

    updateTaskAssignees: (state, action: PayloadAction<{ groupId: string; taskId: string; assignees: ITeamMemberViewModel[] }>) => {
      const { groupId, taskId, assignees } = action.payload;
      const group = state.taskGroups.find(group => group.id === groupId);
      if (group) {
        const task = group.tasks.find(task => task.id === taskId);
        if (task) {
          task.assignees = assignees as ITaskAssignee[];
        }
      }
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
    updateTaskGroup: (state, action: PayloadAction<{ task: TaskType; isSubtasksIncluded: boolean }>) => {
      // state.taskGroups = state.taskGroups.map(group => {
      //   if (group.id === action.payload.task.id) {
      //     return { ...group, tasks: [...group.tasks, action.payload.task] };
      //   }
      //   return group;
      // });
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
      })
      .addCase(fetchTaskAssignees.pending, (state) => {
        state.loadingAssignees = true;
        state.error = null;
      })
      .addCase(fetchTaskAssignees.fulfilled, (state, action) => {
        state.loadingAssignees = false;
        state.taskAssignees = action.payload;
      })
      .addCase(fetchTaskAssignees.rejected, (state, action) => {
        state.loadingAssignees = false;
        state.error = action.error.message || 'Failed to fetch task assignees';
      });
      
  }
});

export const {
  toggleTaskDrawer,
  addTask,
  deleteTask,
  updateTaskAssignees,
  toggleLabel,
} = taskSlice.actions;

export default taskSlice.reducer;
