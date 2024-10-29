import { createSlice } from "@reduxjs/toolkit"

interface createCardState {
    isTodoCreatTaskCardDisable: boolean
    isDoingCreatTaskCardDisable: boolean
    isDoneCreatTaskCardDisable: boolean
}

const initialState: createCardState = {
    isTodoCreatTaskCardDisable: true,
    isDoingCreatTaskCardDisable: true,
    isDoneCreatTaskCardDisable: true,
}

const createCardSlice = createSlice({
    name: 'createCard',
    initialState,
    reducers: {
        setTodoCreatTaskCardDisabled: (state, action) => {
            state.isTodoCreatTaskCardDisable = action.payload
        },
        setDoingCreatTaskCardDisabled: (state, action) => {
            state.isDoingCreatTaskCardDisable = action.payload
        },
        setDoneCreatTaskCardDisabled: (state, action) => {
            state.isDoneCreatTaskCardDisable = action.payload
        }
    }
})

export const { setTodoCreatTaskCardDisabled, setDoingCreatTaskCardDisabled, setDoneCreatTaskCardDisabled } = createCardSlice.actions
export default createCardSlice.reducer