import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TodoType } from '../../types/todo'

type TodoState = {
    todoList: TodoType[]
}

const initialState: TodoState = {
    todoList: [],
}

const todoSlice = createSlice({
    name: 'todoReducer',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<TodoType>) => {
            state.todoList.push(action.payload)
        },
    },
})

export const { addTodo } = todoSlice.actions
export default todoSlice.reducer
