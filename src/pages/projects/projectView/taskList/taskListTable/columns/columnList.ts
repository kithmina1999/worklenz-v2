import { Checkbox } from 'antd';
import React, { ReactNode } from 'react';

export type CustomTableColumnsType = {
  key: string;
  columnHeader: ReactNode | null;
  width: number;
};

export const columnList: CustomTableColumnsType[] = [
  { key: 'selector', columnHeader: React.createElement(Checkbox), width: 20 },
  { key: 'taskId', columnHeader: 'Key', width: 20 },
  { key: 'task', columnHeader: 'Task', width: 300 },
  { key: 'description', columnHeader: 'Description', width: 200 },
  { key: 'progress', columnHeader: 'Progress', width: 60 },
  { key: 'members', columnHeader: 'Members', width: 150 },
  { key: 'labels', columnHeader: 'Labels', width: 150 },
  { key: 'phases', columnHeader: 'Phases', width: 150 },
  { key: 'status', columnHeader: 'Status', width: 120 },
  { key: 'priority', columnHeader: 'Priority', width: 120 },
  { key: 'timeTracking', columnHeader: 'TimeTracking', width: 150 },
  { key: 'estimation', columnHeader: 'Estimation', width: 150 },
  { key: 'startDate', columnHeader: 'StartDate', width: 150 },
  { key: 'dueDate', columnHeader: 'DueDate', width: 150 },
  { key: 'completedDate', columnHeader: 'CompletedDate', width: 150 },
  { key: 'createdDate', columnHeader: 'CreatedDate', width: 150 },
  { key: 'lastUpdated', columnHeader: 'LastUpdated', width: 150 },
  { key: 'reporter', columnHeader: 'Reporter', width: 150 },
];
