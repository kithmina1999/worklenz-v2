import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  IGroupByOption,
  ITaskListColumn,
  ITaskListConfigV2,
  ITaskListGroup,
  ITaskListSortableColumn,
} from '@/types/tasks/taskList.types';
import { tasksApiService } from '@/api/tasks/tasks.api.service';
import logger from '@/utils/errorLogger';
import { ITaskLabel } from '@/types/label.type';
import { ITaskListMemberFilter } from '@/types/tasks/taskListFilters.types';
import { ITaskAssignee } from '@/types/tasks/task.types';
import { ITeamMemberViewModel } from '@/types/teamMembers/teamMembersGetResponse.types';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import { ITaskPrioritiesGetResponse } from '@/types/tasks/taskPriority.types';
import { ITaskStatusViewModel } from '@/types/tasks/taskStatusGetResponse.types';

export enum IGroupBy {
  STATUS = 'status',
  PRIORITY = 'priority',
  PHASE = 'phase',
  MEMBERS = 'members',
}

type TaskState = {
  search: string | null;
  archived: boolean;
  group: IGroupBy;
  isSubtasksInclude: boolean;
  fields: ITaskListSortableColumn[];
  tasks: IProjectTask[];
  taskGroups: ITaskListGroup[];
  columns: ITaskListColumn[];
  selectedTask: IProjectTask | null;
  isTaskDrawerOpen: boolean;
  loadingGroups: boolean;
  error: string | null;
  taskAssignees: ITaskListMemberFilter[];
  loadingAssignees: boolean;
  labels: string[];
  priorities: ITaskPrioritiesGetResponse[];
  statuses: ITaskStatusViewModel[];
  members: ITeamMemberViewModel[];
};

const initialState: TaskState = {
  search: null,
  archived: false,
  group: IGroupBy.STATUS,
  isSubtasksInclude: false,
  fields: [],
  tasks: [],
  columns: [],
  selectedTask: null,
  isTaskDrawerOpen: false,
  taskGroups: [],
  loadingGroups: false,
  error: null,
  taskAssignees: [],
  loadingAssignees: false,
  labels: [],
  priorities: [],
  statuses: [],
  members: [],
};

export const GROUP_BY_STATUS_VALUE = 'status';
export const GROUP_BY_PRIORITY_VALUE = 'priority';
export const GROUP_BY_PHASE_VALUE = 'phase';

export const GROUP_BY_OPTIONS: IGroupByOption[] = [
  { label: 'Status', value: GROUP_BY_STATUS_VALUE },
  { label: 'Priority', value: GROUP_BY_PRIORITY_VALUE },
  { label: 'Phase', value: GROUP_BY_PHASE_VALUE },
];

export const COLUMN_KEYS = {
  KEY: 'KEY',
  NAME: 'NAME',
  DESCRIPTION: 'DESCRIPTION',
  PROGRESS: 'PROGRESS',
  ASSIGNEES: 'ASSIGNEES',
  LABELS: 'LABELS',
  STATUS: 'STATUS',
  PRIORITY: 'PRIORITY',
  TIME_TRACKING: 'TIME_TRACKING',
  ESTIMATION: 'ESTIMATION',
  START_DATE: 'START_DATE',
  DUE_DATE: 'DUE_DATE',
  DUE_TIME: 'DUE_TIME',
  COMPLETED_DATE: 'COMPLETED_DATE',
  CREATED_DATE: 'CREATED_DATE',
  LAST_UPDATED: 'LAST_UPDATED',
  REPORTER: 'REPORTER',
  PHASE: 'PHASE',
};

export const COLUMN_KEYS_LIST = Object.values(COLUMN_KEYS).map(key => ({
  key,
  show: true,
}));

export const getCurrentGroup = () => {
  const key = localStorage.getItem('worklenz.tasklist.group_by');
  if (key) {
    const g = GROUP_BY_OPTIONS.find(o => o.value === key);
    if (g) return g;
  }
  return GROUP_BY_OPTIONS[0];
};

export const setCurrentGroup = (group: IGroupByOption) => {
  localStorage.setItem('worklenz.tasklist.group_by', group.value);
};

export const fetchTaskGroups = createAsyncThunk(
  'tasks/fetchTaskGroups',
  async (projectId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { taskReducer: TaskState };

      const config: ITaskListConfigV2 = {
        id: projectId,
        archived: state?.taskReducer.archived,
        group: state?.taskReducer.group,
        field: state?.taskReducer.fields.map(field => `${field.key} ${field.sort_order}`).join(','),
        order: '',
        search: state?.taskReducer.search || '',
        statuses: '',
        members: '',
        projects: '',
        isSubtasksInclude: true,
        labels: state?.taskReducer.labels.join(' '),
      };
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
      state.isTaskDrawerOpen = !state.isTaskDrawerOpen;
    },

    toggleArchived: state => {
      state.archived = !state.archived;
    },

    setGroup: (state, action: PayloadAction<IGroupBy>) => {
      state.group = action.payload;
    },

    setLabels: (state, action: PayloadAction<string[]>) => {
      state.labels = action.payload;
    },

    setPriorities: (state, action: PayloadAction<ITaskPrioritiesGetResponse[]>) => {
      state.priorities = action.payload;
    },  

    setStatuses: (state, action: PayloadAction<ITaskStatusViewModel[]>) => {
      state.statuses = action.payload;
    },

    setFields: (state, action: PayloadAction<ITaskListSortableColumn[]>) => {
      state.fields = action.payload;
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
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
      state.taskGroups = state.taskGroups.map(group => ({
        ...group,
        tasks: group.tasks.filter(task => task.id !== action.payload),
      }));
    },

    updateTaskAssignees: (
      state,
      action: PayloadAction<{ groupId: string; taskId: string; assignees: ITeamMemberViewModel[] }>
    ) => {
      const { groupId, taskId, assignees } = action.payload;
      const group = state.taskGroups.find(group => group.id === groupId);
      if (group) {
        const task = group.tasks.find(task => task.id === taskId);
        if (task) {
          task.assignees = assignees as ITaskAssignee[];
        }
      }
    },

    updateTaskLabel: (state, action: PayloadAction<{ taskId: string; label: ITaskLabel }>) => {
      const { taskId, label } = action.payload;
      state.taskGroups.forEach(group => {
        const task = group.tasks.find(task => task.id === taskId);
        if (task) {
          if (!task.labels) {
            task.labels = [];
          }
          const labelIndex = task.labels.findIndex(existingLabel => existingLabel.id === label.id);
          if (labelIndex >= 0) {
            task.labels.splice(labelIndex, 1);
          } else {
            task.labels.push(label);
          }
        }
      });
    },

    updateTaskGroup: (
      state,
      action: PayloadAction<{ task: IProjectTask; isSubtasksIncluded: boolean }>
    ) => {
      const { task } = action.payload;
      state.taskGroups = state.taskGroups.map(taskGroup => {
        console.log('taskGroup', taskGroup);
        // if (group. === GROUP_BY_STATUS_VALUE) {
        //   if (taskGroup.id === task.status) {
        //     const taskIndex = taskGroup.tasks.findIndex(t => t.id === task.id);
        //     if (taskIndex >= 0) {
        //       taskGroup.tasks[taskIndex] = task;
        //     } else {
        //       taskGroup.tasks.push(task);
        //     }
        //   }
        // }
        // if (taskGroup.id === GROUP_BY_PRIORITY_VALUE) {
        //   if (taskGroup.id === task.priority) {
        //     const taskIndex = taskGroup.tasks.findIndex(t => t.id === task.id);
        //     if (taskIndex >= 0) {
        //       taskGroup.tasks[taskIndex] = task;
        //     } else {
        //       taskGroup.tasks.push(task);
        //     }
        //   }
        // }
        // if (taskGroup.id === GROUP_BY_PHASE_VALUE) {
        //   if (taskGroup.id === task.phase_id) {
        //     const taskIndex = taskGroup.tasks.findIndex(t => t.id === task.id);
        //     if (taskIndex >= 0) {
        //       taskGroup.tasks[taskIndex] = task;
        //     } else {
        //       taskGroup.tasks.push(task);
        //     }
        //   }
        // }
        return taskGroup;
      });
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchTaskGroups.pending, state => {
        state.loadingGroups = true;
        state.error = null;
      })
      .addCase(fetchTaskGroups.fulfilled, (state, action) => {
        console.log('action.payload', action.payload);
        state.loadingGroups = false;
        state.taskGroups = action.payload;
      })
      .addCase(fetchTaskGroups.rejected, (state, action) => {
        state.loadingGroups = false;
        state.error = action.error.message || 'Failed to fetch task groups';
      })
      .addCase(fetchTaskAssignees.pending, state => {
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
  },
});

export const {
  toggleTaskDrawer,
  setGroup,
  addTask,
  deleteTask,
  updateTaskAssignees,
  updateTaskLabel: toggleLabel,
  toggleArchived,
  setLabels,
  setPriorities,
  setStatuses,
  setFields,
  setSearch,
} = taskSlice.actions;

export default taskSlice.reducer;
