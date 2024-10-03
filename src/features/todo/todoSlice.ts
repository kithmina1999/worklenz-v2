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
        completeTodo: (state, action: PayloadAction<TodoType>) => {
            state.todoList = state.todoList.filter(
                (todo) => todo.id !== action.payload.id
            )
        },
    },
})

export const { addTodo, completeTodo } = todoSlice.actions
export default todoSlice.reducer
