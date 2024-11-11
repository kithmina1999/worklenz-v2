import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import logger from '@/utils/errorLogger';
import { projectStatusesApiService } from '@/api/projects/projectStatus.api.service';
import { IProjectStatus } from '@/types/project/projectStatus.types';

type ProjectStatusState = {
  initialized: boolean;
  statuses: IProjectStatus[];
  loading: boolean;
};

// Async thunk
export const fetchProjectStatuses = createAsyncThunk(
  'projectStatuses/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await projectStatusesApiService.getStatuses();
      return response.body;
    } catch (error) {
      logger.error('Fetch Project Statuses', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch project statuses');
    }
  }
);

const initialState: ProjectStatusState = {
  statuses: [],
  initialized: false,
  loading: false,
};

const projectStatusesSlice = createSlice({
  name: 'projectStatuses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectStatuses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectStatuses.fulfilled, (state, action) => {
        state.statuses = action.payload;
        state.loading = false;
        state.initialized = true;
      })
      .addCase(fetchProjectStatuses.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default projectStatusesSlice.reducer;
