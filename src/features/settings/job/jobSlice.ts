import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { JobType } from '../../../types/job'

type JobState = {
    jobsList: JobType[]
    isDrawerOpen: boolean
}

const initialState: JobState = {
    jobsList: [],
    isDrawerOpen: false,
}

const jobSlice = createSlice({
    name: 'jobReducer',
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.isDrawerOpen
                ? (state.isDrawerOpen = false)
                : (state.isDrawerOpen = true)
        },
        // action for create job
        addJobTitle: (state, action: PayloadAction<JobType>) => {
            state.jobsList.push(action.payload)
        },
    },
})

export const { toggleDrawer, addJobTitle } = jobSlice.actions
export default jobSlice.reducer
