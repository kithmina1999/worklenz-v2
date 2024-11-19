import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICategorizedStatus, ITaskStatus } from '@/types/tasks/taskStatus.types';
import logger from '@utils/errorLogger';
import { statusApiService } from '@/api/taskAttributes/status/status.api.service';

interface IStatusState {
  status: ITaskStatus[];
  categorizedStatusList: ICategorizedStatus[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: IStatusState = {
  status: [],
  categorizedStatusList: [],
  loading: false,
  error: null,
  initialized: false
};

// Create async thunk for fetching statuses
export const fetchStatuses = createAsyncThunk(
  'status/fetchStatuses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await statusApiService.getStatuses();
      return response.body;
    } catch (error) {
      logger.error('Fetch Statuses', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch statuses');
    }
  }
);

// Initialization thunk
export const initializeStatuses = createAsyncThunk(
  'status/initialize',
  async (_, { dispatch, getState }) => {
    const state = getState() as { statusReducer: IStatusState };
    if (!state.statusReducer.initialized) {
      await dispatch(fetchStatuses());
    }
  }
);

const statusSlice = createSlice({
  name: 'statusReducer',
  initialState,
  reducers: {
    addStatus: (state, action: PayloadAction<ITaskStatus>) => {
      state.status.push(action.payload);
    },
    updateStatus: (state, action: PayloadAction<ITaskStatus>) => {
      const index = state.status.findIndex(status => status.id === action.payload.id);
      if (index !== -1) {
        state.status[index] = action.payload;
      }
    },
    deleteStatus: (state, action: PayloadAction<string>) => {
      state.status = state.status.filter(status => status.id !== action.payload);
    },
    setCategorizedStatuses: (state, action: PayloadAction<ICategorizedStatus[]>) => {
      state.categorizedStatusList = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatuses.fulfilled, (state, action: PayloadAction<ITaskStatus[]>) => {
        state.loading = false;
        state.status = action.payload;
        state.initialized = true;
        state.error = null;
      })
      .addCase(fetchStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { addStatus, updateStatus, deleteStatus, setCategorizedStatuses } = statusSlice.actions;
export default statusSlice.reducer;
