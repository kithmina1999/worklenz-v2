import { LabelType } from './label.type';
import { MemberType } from './member.types';
import { ProjectType } from './project.types';

export type TaskStatusType = 'doing' | 'todo' | 'done';
export type TaskPriorityType = 'low' | 'medium' | 'high';

export type SubTaskType = {
  subTaskId: string;
  subTask: string;
  subTaskMembers?: string[];
  subTaskStatus: TaskStatusType;
  subTaskDueDate?: Date;
};

export type TaskType = {
  taskId: string;
  task: string;
  description?: string;
  progress?: number;
  members?: MemberType[];
  labels?: LabelType[];
  status: TaskStatusType;
  priority: TaskPriorityType;
  timeTracking?: string;
  estimation?: string;
  startDate?: Date | null;
  dueDate?: Date | null;
  completedDate?: Date | null;
  createdDate?: Date;
  lastUpdated?: Date;
  reporter?: string;
  phase?: string;
  subTasks?: TaskType[];
  project?: ProjectType;
};
