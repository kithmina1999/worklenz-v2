import { createSlice } from "@reduxjs/toolkit"

interface billingState {
    isDrawerOpen: boolean
}

const initialState: billingState = {
    isDrawerOpen: false
}

const billingSlice = createSlice({
    name: 'billingReducer',
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.isDrawerOpen
                ? (state.isDrawerOpen = false)
                : (state.isDrawerOpen = true)
        }
    }
})

export const {toggleDrawer} = billingSlice.actions
export default billingSlice.reducer