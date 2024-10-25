import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TaskType } from '../../types/task.types'

type TaskState = {
    tasks: TaskType[]
    isCreateTaskDrawerOpen: boolean
    isUpdateTaskDrawerOpen: boolean
}

const initialState: TaskState = {
    isCreateTaskDrawerOpen: false,
    isUpdateTaskDrawerOpen: false,
    tasks: [
        {
            taskId: 'SP-1',
            task: 'Workload',
            description: '-',
            progress: 5,
            members: [],
            labels: '-',
            status: 'todo',
            priority: 'high',
            timeTracking: '-',
            estimation: '-',
            startDate: new Date(),
            dueDate: new Date(),
            completedDate: new Date(),
            createdDate: new Date(),
            lastUpdated: new Date(),
            reporter: '-',
            phase: '-',
        },
        {
            taskId: 'SP-4',
            task: 'Settings (task templates)',
            description: '-',
            progress: 30,
            members: [],
            labels: '-',
            status: 'doing',
            priority: 'medium',
            timeTracking: '-',
            estimation: '-',
            startDate: new Date(),
            dueDate: new Date(),
            completedDate: new Date(),
            createdDate: new Date(),
            lastUpdated: new Date(),
            reporter: '-',
            phase: '-',
        },
        {
            taskId: 'SP-5',
            task: 'Insights (tasks)',
            description: '-',
            progress: 20,
            members: [],
            labels: '-',
            status: 'todo',
            priority: 'low',
            timeTracking: '-',
            estimation: '-',
            startDate: new Date(),
            dueDate: new Date(),
            completedDate: new Date(),
            createdDate: new Date(),
            lastUpdated: new Date(),
            reporter: '-',
            phase: '-',
        },
        {
            taskId: 'SP-12',
            task: 'Settings (change password)',
            description: '-',
            progress: 80,
            members: [],
            labels: '-',
            status: 'done',
            priority: 'medium',
            timeTracking: '-',
            estimation: '-',
            startDate: new Date(),
            dueDate: new Date(),
            completedDate: new Date(),
            createdDate: new Date(),
            lastUpdated: new Date(),
            reporter: '-',
            phase: '-',
        },
    ],
}

const taskSlice = createSlice({
    name: 'taskReducer',
    initialState,
    reducers: {
        toggleCreateTaskDrawer: (state) => {
            state.isCreateTaskDrawerOpen
                ? (state.isCreateTaskDrawerOpen = false)
                : (state.isCreateTaskDrawerOpen = true)
        },

        toggleUpdateTaskDrawer: (state) => {
            state.isUpdateTaskDrawerOpen
                ? (state.isUpdateTaskDrawerOpen = false)
                : (state.isUpdateTaskDrawerOpen = true)
        },

        addTask: (state, action: PayloadAction<TaskType>) => {
            state.tasks.push(action.payload)
        },
    },
})

export const { addTask, toggleCreateTaskDrawer, toggleUpdateTaskDrawer } =
    taskSlice.actions
export default taskSlice.reducer
