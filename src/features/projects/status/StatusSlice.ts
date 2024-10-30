import { createSlice } from "@reduxjs/toolkit"

interface StatusState  {
    isCreateStatusDrawerOpen: boolean
}

const initialState: StatusState = {
    isCreateStatusDrawerOpen: false
}

const statusSlice = createSlice({
    name: 'statusReducer',
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.isCreateStatusDrawerOpen
                ? state.isCreateStatusDrawerOpen = false
                : state.isCreateStatusDrawerOpen = true
        }
    }
})

export const { toggleDrawer } = statusSlice.actions
export default statusSlice.reducer