import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProjectType } from '../../types/project.types';
import { API_BASE_URL } from '@/shared/constants';
import { projectsApiService } from '@/api/projects/projects.api.service';
import logger from '@/utils/errorLogger';
import { IProjectsViewModel } from '@/types/project/projectsViewModel.types';

type ProjectState = {
  initialized: boolean;
  projectsViewModel: IProjectsViewModel;
  isProjectDrawerOpen: boolean;
  loading: boolean;
};

// Create async thunk for fetching teams
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (
    params: {
      index: number;
      size: number;
      field: string;
      order: string;
      search: string;
      filter: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const projectsResponse = await projectsApiService.getProjects(
        params.index,
        params.size,
        params.field,
        params.order,
        params.search,
        params.filter
      );
      return projectsResponse.body;
    } catch (error) {
      logger.error('Fetch Projects', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch projects');
    }
  }
);

const initialState: ProjectState = {
  projectsViewModel: {total: 0, data: []},
  isProjectDrawerOpen: false,
  initialized: false,
  loading: false,
};

const projectSlice = createSlice({
  name: 'projectReducer',
  initialState,
  reducers: {
    toggleDrawer: state => {
      state.isProjectDrawerOpen
        ? (state.isProjectDrawerOpen = false)
        : (state.isProjectDrawerOpen = true);
    },
    createProject: (state, action: PayloadAction<ProjectType>) => {
    },
    toggleFavouriteProjectSelection: (state, action: PayloadAction<string>) => {
    },
    deleteProject: (state, action: PayloadAction<string>) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projectsViewModel = action.payload;
        state.initialized = true;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { toggleDrawer, createProject, toggleFavouriteProjectSelection, deleteProject } =
  projectSlice.actions;
export default projectSlice.reducer;
