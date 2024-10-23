import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TableProps } from 'antd'
import { TaskType } from '../../../../types/task.types'

type projectViewTaskListColumnsState = {
    columnsList: TableProps<TaskType>['columns']
}

const initialState: projectViewTaskListColumnsState = {
    // table columns
    columnsList: [
        {
            key: 'taskId',
            dataIndex: 'taskId',
            title: 'Key',
            width: 100,
            hidden: true,
        },
        {
            key: 'task',
            dataIndex: 'task',
            title: 'Task',
            width: 400,
            // hidden: false,
            fixed: 'left',
        },
        {
            key: 'description',
            dataIndex: 'description',
            title: 'Description',
            width: 300,
            hidden: true,
        },
        {
            key: 'progress',
            dataIndex: 'progress',
            title: 'Progress',
            width: 100,
            hidden: false,
        },
        {
            key: 'members',
            dataIndex: 'members',
            title: 'Members',
            width: 200,
            hidden: false,
        },
        {
            key: 'labels',
            dataIndex: 'labels',
            title: 'Labels',
            width: 200,
            hidden: false,
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: 'Status',
            width: 200,
            hidden: false,
        },
        {
            key: 'priority',
            dataIndex: 'priority',
            title: 'Priority',
            width: 200,
            hidden: false,
        },
        {
            key: 'timeTracking',
            dataIndex: 'timeTracking',
            title: 'TimeTracking',
            width: 200,
            hidden: false,
        },
        {
            key: 'estimation',
            dataIndex: 'estimation',
            title: 'Estimation',
            width: 200,
            hidden: true,
        },
        {
            key: 'startDate',
            dataIndex: 'startDate',
            title: 'StartDate',
            width: 200,
            hidden: true,
        },
        {
            key: 'dueDate',
            dataIndex: 'dueDate',
            title: 'DueDate',
            width: 200,
            hidden: false,
        },
        {
            key: 'completedDate',
            dataIndex: 'completedDate',
            title: 'CompletedDate',
            width: 200,
            hidden: true,
        },
        {
            key: 'createdDate',
            dataIndex: 'createdDate',
            title: 'CreatedDate',
            width: 200,
            hidden: true,
        },
        {
            key: 'lastUpdated',
            dataIndex: 'lastUpdated',
            title: 'LastUpdated',
            width: 200,
            hidden: true,
        },
        {
            key: 'reporter',
            dataIndex: 'reporter',
            title: 'Reporter',
            width: 200,
            hidden: true,
        },
        {
            key: 'phase',
            dataIndex: 'phase',
            title: 'Phase',
            width: 200,
            hidden: true,
        },
    ],
}

const projectViewTaskListColumnsSlice = createSlice({
    name: 'projectViewTaskListColumnsReducer',
    initialState,
    reducers: {
        toggleColumnVisibility: (state, action: PayloadAction<string>) => {
            if (state.columnsList) {
                const columnIndex = state.columnsList?.findIndex(
                    (col) => col.key === action.payload
                )

                if (columnIndex !== -1) {
                    state.columnsList[columnIndex] = {
                        ...state.columnsList[columnIndex],
                        hidden: !state.columnsList[columnIndex].hidden,
                    }
                }
            }
        },
    },
})

export const { toggleColumnVisibility } =
    projectViewTaskListColumnsSlice.actions
export default projectViewTaskListColumnsSlice.reducer
