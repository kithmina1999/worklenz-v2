import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import { ITaskListColumn, ITaskListGroup } from '@/types/tasks/taskList.types';
import { ITeamMemberViewModel } from '@/types/teamMembers/teamMembersGetResponse.types';
import { ITaskLabel } from '@/types/tasks/taskLabel.types';
import { ITaskPrioritiesGetResponse } from '@/types/apiModels/taskPrioritiesGetResponse.types';
import { ITaskStatusViewModel } from '@/types/tasks/taskStatusGetResponse.types';
import { ITaskPhase } from '@/types/tasks/taskPhase.types';

interface TaskListState {
  projectId: string | null;
  columns: ITaskListColumn[];
  members: ITeamMemberViewModel[];
  labels: ITaskLabel[];
  statuses: ITaskStatusViewModel[];
  priorities: ITaskPrioritiesGetResponse[];
  phases: ITaskPhase[];
  groups: ITaskListGroup[];
  isSubtasksIncluded: boolean;
  selectedTasks: IProjectTask[];
}

const STORAGE_KEY = 'worklenz.tasklist.group_by';

export const GROUP_BY_OPTIONS = [
  { label: "Status", value: "status" },
  { label: "Priority", value: "priority" },
  { label: "Phase", value: "phase" }
];

const initialState: TaskListState = {
  projectId: null,
  columns: [],
  members: [],
  labels: [],
  statuses: [],
  priorities: [],
  phases: [],
  groups: [],
  isSubtasksIncluded: false,
  selectedTasks: []
};

const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    setProjectId: (state, action: PayloadAction<string>) => {
      state.projectId = action.payload;
    },
    setColumns: (state, action: PayloadAction<ITaskListColumn[]>) => {
      state.columns = action.payload;
    },
    setMembers: (state, action: PayloadAction<ITeamMemberViewModel[]>) => {
      state.members = action.payload;
    },
    setLabels: (state, action: PayloadAction<ITaskLabel[]>) => {
      state.labels = action.payload;
    },
    setStatuses: (state, action: PayloadAction<ITaskStatusViewModel[]>) => {
      state.statuses = action.payload;
    },
    setPriorities: (state, action: PayloadAction<ITaskPrioritiesGetResponse[]>) => {
      state.priorities = action.payload;
    },
    setPhases: (state, action: PayloadAction<ITaskPhase[]>) => {
      state.phases = action.payload;
    },
    setGroups: (state, action: PayloadAction<ITaskListGroup[]>) => {
      state.groups = action.payload;
    },
    setSubtasksIncluded: (state, action: PayloadAction<boolean>) => {
      state.isSubtasksIncluded = action.payload;
    },
    addTask: (state, action: PayloadAction<{ task: IProjectTask; groupId: string; insert?: boolean }>) => {
      const { task, groupId, insert = false } = action.payload;
      const group = state.groups.find(g => g.id === groupId);
      
      if (group && task.id) {
        if (task.parent_task_id) {
          const parentTask = group.tasks.find(t => t.id === task.parent_task_id);
          if (parentTask) {
            if (!parentTask.sub_tasks_count) parentTask.sub_tasks_count = 0;
            parentTask.sub_tasks_count++;
            parentTask.sub_tasks?.push(task);
          }
        } else {
          if (insert) {
            group.tasks.unshift(task);
          } else {
            group.tasks.push(task);
          }
        }
      }
    },
    deleteTask: (state, action: PayloadAction<{ taskId: string; index?: number }>) => {
      const { taskId, index } = action.payload;
      
      for (const group of state.groups) {
        const taskIndex = index ?? group.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          const task = group.tasks[taskIndex];
          
          if (task.is_sub_task) {
            const parentTask = group.tasks.find(t => t.id === task.parent_task_id);
            if (parentTask?.sub_tasks) {
              const subTaskIndex = parentTask.sub_tasks.findIndex(t => t.id === task.id);
              if (subTaskIndex !== -1) {
                if (!parentTask.sub_tasks_count) parentTask.sub_tasks_count = 0;
                parentTask.sub_tasks_count = Math.max(parentTask.sub_tasks_count - 1, 0);
                parentTask.sub_tasks.splice(subTaskIndex, 1);
              }
            }
          } else {
            group.tasks.splice(taskIndex, 1);
          }
          break;
        }
      }
    },
    reset: () => initialState
  }
});

export const {
  setProjectId,
  setColumns,
  setMembers,
  setLabels,
  setStatuses,
  setPriorities,
  setPhases,
  setGroups,
  setSubtasksIncluded,
  addTask,
  deleteTask,
  reset
} = taskListSlice.actions;

export default taskListSlice.reducer;