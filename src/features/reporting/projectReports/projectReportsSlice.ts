import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type ProjectReportsState = {
  isProjectReportsDrawerOpen: boolean;
  isProjectReportsMembersTaskDrawerOpen: boolean;
  projectList: any[];
  isLoading: boolean;
  error: string | null;
};

// async thunk for fetching project data
export const fetchProjectData = createAsyncThunk(
  'projectReports/fetchProjectData',
  async () => {
    const response = await fetch(
      '/reportingMockData/projectReports/projects.json'
    );
    if (!response.ok) throw new Error(`Response error: ${response.status}`);
    return await response.json();
  }
);

const initialState: ProjectReportsState = {
  isProjectReportsDrawerOpen: false,
  isProjectReportsMembersTaskDrawerOpen: false,
  projectList: [],
  isLoading: false,
  error: null,
};

const projectReportsSlice = createSlice({
  name: 'projectReportsReducer',
  initialState,
  reducers: {
    toggleProjectReportsDrawer: (state) => {
      state.isProjectReportsDrawerOpen = !state.isProjectReportsDrawerOpen;
    },
    toggleProjectReportsMembersTaskDrawer: (state) => {
      state.isProjectReportsMembersTaskDrawerOpen =
        !state.isProjectReportsMembersTaskDrawerOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjectData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectList = action.payload;
      })
      .addCase(fetchProjectData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch project data';
      });
  },
});

export const {
  toggleProjectReportsDrawer,
  toggleProjectReportsMembersTaskDrawer,
} = projectReportsSlice.actions;
export default projectReportsSlice.reducer;
