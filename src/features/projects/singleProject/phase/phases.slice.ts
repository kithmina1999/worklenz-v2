import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PhaseOption } from '../../../../types/phase.types';
import { ITaskPhase } from '@/types/tasks/taskPhase.types';
import { phasesApiService } from '@/api/taskAttributes/phases/phases.api.service';

type PhaseState = {
  isPhaseDrawerOpen: boolean;
  phaseList: ITaskPhase[];
  loadingPhases: boolean;
};

const initialState: PhaseState = {
  isPhaseDrawerOpen: false,
  phaseList: [],
  loadingPhases: false,
};

export const addPhaseOption = createAsyncThunk(
  'phase/addPhaseOption',
  async ({ projectId }: { projectId: string }, { rejectWithValue }) => {
    try {
      const response = await phasesApiService.addPhaseOption(projectId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPhasesByProjectId = createAsyncThunk(
  'phase/fetchPhasesByProjectId',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await phasesApiService.getPhasesByProjectId(projectId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePhaseOption = createAsyncThunk(
  'phase/deletePhaseOption',
  async ({ phaseOptionId, projectId }: { phaseOptionId: string; projectId: string }, { rejectWithValue }) => {
    try {
      const response = await phasesApiService.deletePhaseOption(phaseOptionId, projectId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePhaseColor = createAsyncThunk(
  'phase/updatePhaseColor',
  async ({ projectId, body }: { projectId: string; body: ITaskPhase }, { rejectWithValue }) => {
    try {
      const response = await phasesApiService.updatePhaseColor(projectId, body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const phaseSlice = createSlice({
  name: 'phaseReducer',
  initialState,
  reducers: {
    toggleDrawer: state => {
      state.isPhaseDrawerOpen = !state.isPhaseDrawerOpen;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPhasesByProjectId.fulfilled, (state, action) => {
      state.phaseList = action.payload.body;
      state.loadingPhases = false;
    });
    builder.addCase(fetchPhasesByProjectId.pending, state => {
      state.loadingPhases = true;
    });
    builder.addCase(fetchPhasesByProjectId.rejected, state => {
      state.loadingPhases = false;
    });
  },
});

export const { toggleDrawer } = phaseSlice.actions;
export default phaseSlice.reducer;
