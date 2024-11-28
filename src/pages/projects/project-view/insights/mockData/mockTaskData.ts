import { TaskStatusType } from '../../../../../types/task.types';

// Mock task data type
export type MockTaskType = {
  taskId: string;
  task: string;
  status: TaskStatusType | string;
  dueDate: Date | null;
  lastUpdated: Date;
  completedDate?: Date | null;
  members?: { memberId: string; memberName: string }[] | null;
  loggedTime?: string;
};

export const mockTaskData: MockTaskType[] = [
  {
    taskId: '1',
    task: 'App launch time measurement',
    status: 'To Do',
    dueDate: new Date('2023-09-22'),
    lastUpdated: new Date('2023-11-01'),
    members: [
      { memberId: 'M1', memberName: 'Sachintha Prasad' },
      { memberId: 'M3', memberName: 'Amal Perera' },
    ],
  },
  {
    taskId: '2',
    task: 'App response time analysis',
    status: 'Doing',
    dueDate: new Date('2023-09-08'),
    lastUpdated: new Date('2023-10-15'),
    members: [{ memberId: 'M2', memberName: 'Raveesha Dilanka' }],
  },
  {
    taskId: '3',
    task: 'Permission enforcement',
    status: 'Doing',
    dueDate: new Date('2023-09-23'),
    lastUpdated: new Date('2023-11-03'),
    members: [{ memberId: 'M3', memberName: 'Amal Perera' }],
  },

  {
    taskId: '4',
    task: 'Background Process Management',
    status: 'Done',
    dueDate: new Date('2023-09-30'),
    lastUpdated: new Date('2023-10-01'),
    loggedTime: '19h 0m',
    members: [
      { memberId: 'M3', memberName: 'Amal Perera' },
      { memberId: 'M2', memberName: 'Raveesha Dilanka' },
    ],
  },
  {
    taskId: '5',
    task: 'App Performance Analysis',
    status: 'To Do',
    dueDate: new Date('2024-04-10'),
    lastUpdated: new Date('2023-11-01'),
    loggedTime: '30h 1m',
    members: [
      { memberId: 'M1', memberName: 'Sachintha Prasad' },
      { memberId: 'M2', memberName: 'Raveesha Dilanka' },
      { memberId: 'M3', memberName: 'Amal Perera' },
    ],
  },

  {
    taskId: '6',
    task: 'App crash detection',
    status: 'Done',
    dueDate: new Date('2023-09-22'),
    completedDate: new Date('2023-09-08'),
    lastUpdated: new Date('2023-09-10'),
    loggedTime: '-0h 14m',
    members: [{ memberId: 'M1', memberName: 'Sachintha Prasad' }],
  },
  {
    taskId: '7',
    task: 'Background app restriction',
    status: 'Done',
    dueDate: new Date('2023-09-22'),
    completedDate: new Date('2023-09-08'),
    lastUpdated: new Date('2023-09-15'),
    loggedTime: '5h 14m',
    members: [{ memberId: 'M3', memberName: 'Amal Perera' }],
  },

  {
    taskId: '8',
    task: 'Task Logging and Reporting',
    status: 'Done',
    dueDate: new Date('2023-09-08'),
    completedDate: new Date('2024-04-08'),
    lastUpdated: new Date('2024-04-10'),
    loggedTime: '-2h 14m',
    members: [{ memberId: 'M1', memberName: 'Sachintha Prasad' }],
  },
  {
    taskId: '9',
    task: 'App Permission Monitoring',
    status: 'Done',
    dueDate: new Date('2023-09-08'),
    completedDate: new Date('2024-04-08'),
    lastUpdated: new Date('2024-04-09'),
    members: [{ memberId: 'M2', memberName: 'Raveesha Dilanka' }],
  },

  {
    taskId: '10',
    task: 'User feedback collection system',
    status: 'To Do',
    dueDate: new Date('2024-03-15'),
    lastUpdated: new Date('2023-11-01'),
    loggedTime: '2h 30m',
    members: null,
  },
  {
    taskId: '11',
    task: 'Security Scanning and Monitoring',
    status: 'To Do',
    dueDate: new Date('2023-10-30'),
    lastUpdated: new Date('2023-11-05'),
    loggedTime: '55m',
    members: null,
  },
];
