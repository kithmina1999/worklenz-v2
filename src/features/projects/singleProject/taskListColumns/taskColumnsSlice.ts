import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskType } from '../../../../types/task.types';
import { TableColumnsType } from 'antd';

type projectViewTaskListColumnsState = {
  columnsList: TableColumnsType<TaskType>;
};

const initialState: projectViewTaskListColumnsState = {
  // table columns
  columnsList: [
    {
      key: 'taskId',
      title: 'Key',
      width: 100,
      hidden: true,
    },
    {
      key: 'task',
      title: 'Task',
      width: 400,
      fixed: 'left',
    },
    {
      key: 'description',
      title: 'Description',
      width: 300,
      hidden: true,
    },
    {
      key: 'progress',
      title: 'Progress',
      width: 100,
      hidden: false,
    },
    {
      key: 'members',
      dataIndex: 'members',
      title: 'Members',
      width: 150,
      hidden: false,
    },
    {
      key: 'labels',
      dataIndex: 'labels',
      title: 'Labels',
      width: 150,
      hidden: false,
    },
    {
      // in here the phase title also render in task list table
      key: 'phase',
      title: 'Phase',
      width: 150,
      hidden: false,
    },
    {
      key: 'status',
      title: 'Status',
      width: 150,
      hidden: false,
    },
    {
      key: 'priority',
      title: 'Priority',
      width: 150,
      hidden: false,
    },
    {
      key: 'timeTracking',
      dataIndex: 'timeTracking',
      title: 'TimeTracking',
      width: 150,
      hidden: false,
    },
    {
      key: 'estimation',
      dataIndex: 'estimation',
      title: 'Estimation',
      width: 150,
      hidden: true,
    },
    {
      key: 'startDate',
      dataIndex: 'startDate',
      title: 'StartDate',
      width: 150,
      hidden: true,
    },
    {
      key: 'dueDate',
      dataIndex: 'dueDate',
      title: 'DueDate',
      width: 150,
      hidden: false,
    },
    {
      key: 'completedDate',
      dataIndex: 'completedDate',
      title: 'CompletedDate',
      width: 150,
      hidden: true,
    },
    {
      key: 'createdDate',
      dataIndex: 'createdDate',
      title: 'CreatedDate',
      width: 150,
      hidden: true,
    },
    {
      key: 'lastUpdated',
      dataIndex: 'lastUpdated',
      title: 'LastUpdated',
      width: 150,
      hidden: true,
    },
    {
      key: 'reporter',
      dataIndex: 'reporter',
      title: 'Reporter',
      width: 150,
      hidden: true,
    },
  ],
};

const projectViewTaskListColumnsSlice = createSlice({
  name: 'projectViewTaskListColumnsReducer',
  initialState,
  reducers: {
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      if (state.columnsList) {
        const columnIndex = state.columnsList?.findIndex(
          (col) => col.key === action.payload
        );

        if (columnIndex !== -1) {
          state.columnsList[columnIndex] = {
            ...state.columnsList[columnIndex],
            hidden: !state.columnsList[columnIndex].hidden,
          };
        }
      }
    },
  },
});

export const { toggleColumnVisibility } =
  projectViewTaskListColumnsSlice.actions;
export default projectViewTaskListColumnsSlice.reducer;
