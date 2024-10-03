import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectType } from '../../../types/project'

type CreateProjectState = {
    projects: ProjectType[]
    isDrawerOpen: boolean
}

const initialState: CreateProjectState = {
    projects: [],
    isDrawerOpen: false,
}

const createProjectSlice = createSlice({
    name: 'createProjectReducer',
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.isDrawerOpen
                ? (state.isDrawerOpen = false)
                : (state.isDrawerOpen = true)
        },
        createProject: (state, action: PayloadAction<ProjectType>) => {
            state.projects.push(action.payload)
        },
    },
})

export const { toggleDrawer, createProject } = createProjectSlice.actions
export default createProjectSlice.reducer
