import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectType } from '../../types/project'

type ProjectState = {
    projects: ProjectType[]
    isDrawerOpen: boolean
}

const initialState: ProjectState = {
    projects: [],
    isDrawerOpen: false,
}

const projectSlice = createSlice({
    name: 'project reducer',
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

export const { toggleDrawer, createProject } = projectSlice.actions
export default projectSlice.reducer
