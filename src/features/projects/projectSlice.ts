import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectType } from '../../types/project'

type ProjectState = {
    projectsList: ProjectType[]
    isDrawerOpen: boolean
}

const saveProjectListToLocalStorage = (projectsList: ProjectType[]) => {
    try {
        const serializedList = JSON.stringify(projectsList)
        localStorage.setItem('projectList', serializedList)
    } catch (error) {
        console.error('Could not save project list', error)
    }
}

const getProjectListFromLocalStorage = (): ProjectType[] => {
    try {
        const serializedList = localStorage.getItem('projectList')
        if (serializedList === null) {
            return [] 
        }
        return JSON.parse(serializedList)
    } catch (error) {
        console.error('Could not load project list', error)
        return []
    }
}

const initialState: ProjectState = {
    projectsList: getProjectListFromLocalStorage(),
    isDrawerOpen: false,
}

const projectSlice = createSlice({
    name: 'projectReducer',
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.isDrawerOpen
                ? (state.isDrawerOpen = false)
                : (state.isDrawerOpen = true)
        },
        // action for create project
        createProject: (state, action: PayloadAction<ProjectType>) => {
            state.projectsList.push(action.payload)
            saveProjectListToLocalStorage(state.projectsList)
        },
        // action for set the is favourite state
        toggleFavouriteProjectSelection: (
            state,
            action: PayloadAction<string>
        ) => {
            const project = state.projectsList.find(
                (project) => project.projectId === action.payload
            )
            if (project) {
                project.isFavourite
                    ? (project.isFavourite = false)
                    : (project.isFavourite = true)
            }
        },
        deleteProject: (state, action: PayloadAction<string>) => {
            state.projectsList = state.projectsList.filter(
                (project) => project.projectId !== action.payload
            )
            saveProjectListToLocalStorage(state.projectsList)
        },
    },
})

export const { toggleDrawer, createProject, toggleFavouriteProjectSelection, deleteProject } =
    projectSlice.actions
export default projectSlice.reducer
