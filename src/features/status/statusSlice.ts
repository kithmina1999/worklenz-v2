import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { statusApiService } from '@/api/status/status.api.service';
import { ICategorizedStatus, IKanbanTaskStatus } from '@/types/tasks/taskStatus.types';
import logger from '@utils/errorLogger';

interface IStatusState {
  statusList: IKanbanTaskStatus[];
  categorizedStatusList: ICategorizedStatus[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: IStatusState = {
  statusList: [],
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
    addStatus: (state, action: PayloadAction<IKanbanTaskStatus>) => {
      state.statusList.push(action.payload);
    },
    updateStatus: (state, action: PayloadAction<IKanbanTaskStatus>) => {
      const index = state.statusList.findIndex(status => status.id === action.payload.id);
      if (index !== -1) {
        state.statusList[index] = action.payload;
      }
    },
    deleteStatus: (state, action: PayloadAction<string>) => {
      state.statusList = state.statusList.filter(status => status.id !== action.payload);
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
      .addCase(fetchStatuses.fulfilled, (state, action: PayloadAction<IKanbanTaskStatus[]>) => {
        state.loading = false;
        state.statusList = action.payload;
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
