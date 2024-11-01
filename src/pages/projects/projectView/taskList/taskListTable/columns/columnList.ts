import { Checkbox } from 'antd';
import React, { ReactNode } from 'react';
import PhaseHeader from '../../../../../../features/projects/singleProject/phase/PhaseHeader';

export type CustomTableColumnsType = {
  key: string;
  columnName: string;
  columnHeader: ReactNode | null;
  width: number;
};

const phaseHeader = React.createElement(PhaseHeader);

export const columnList: CustomTableColumnsType[] = [
  {
    key: 'selector',
    columnName: 'Selector',
    columnHeader: React.createElement(Checkbox),
    width: 20,
  },
  { key: 'taskId', columnName: 'Key', columnHeader: 'Key', width: 20 },
  { key: 'task', columnName: 'Task', columnHeader: 'Task', width: 400 },
  {
    key: 'description',
    columnName: 'Description',
    columnHeader: 'Description',
    width: 200,
  },
  {
    key: 'progress',
    columnName: 'Progress',
    columnHeader: 'Progress',
    width: 60,
  },
  {
    key: 'members',
    columnName: 'Members',
    columnHeader: 'Members',
    width: 150,
  },
  { key: 'labels', columnName: 'Labels', columnHeader: 'Labels', width: 150 },
  {
    key: 'phases',
    columnName: 'Phases',
    columnHeader: phaseHeader,
    width: 150,
  },
  { key: 'status', columnName: 'Status', columnHeader: 'Status', width: 120 },
  {
    key: 'priority',
    columnName: 'Priority',
    columnHeader: 'Priority',
    width: 120,
  },
  {
    key: 'timeTracking',
    columnName: 'Time Tracking',
    columnHeader: 'TimeTracking',
    width: 150,
  },
  {
    key: 'estimation',
    columnName: 'Estimation',
    columnHeader: 'Estimation',
    width: 150,
  },
  {
    key: 'startDate',
    columnName: 'Start Date',
    columnHeader: 'StartDate',
    width: 150,
  },
  {
    key: 'dueDate',
    columnName: 'Due Date',
    columnHeader: 'DueDate',
    width: 150,
  },
  {
    key: 'completedDate',
    columnName: 'Completed Date',
    columnHeader: 'CompletedDate',
    width: 150,
  },
  {
    key: 'createdDate',
    columnName: 'Created Date',
    columnHeader: 'CreatedDate',
    width: 150,
  },
  {
    key: 'lastUpdated',
    columnName: 'Last Updated',
    columnHeader: 'LastUpdated',
    width: 150,
  },
  {
    key: 'reporter',
    columnName: 'Reporter',
    columnHeader: 'Reporter',
    width: 150,
  },
];
