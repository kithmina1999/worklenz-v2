import { createSlice } from '@reduxjs/toolkit'
import { TaskType } from '../../types/task'

type TaskState = {
    tasks: TaskType[]
}

const initialState: TaskState = {
    tasks: [],
}

const taskSlice = createSlice({
    name: 'taskReducer',
    initialState,
    reducers: {},
})

export default taskSlice.reducer
