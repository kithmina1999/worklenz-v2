import { scheduleAPIService } from '@/api/schedule/schedule.api.service';
import logger from '@/utils/errorLogger';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface scheduleState {
  isSettingsDrawerOpen: boolean;
  isScheduleDrawerOpen: boolean;
  workingDays: string[];
  workingHours: number;
  teamData: any[];
  dateList: any;
  loading: boolean;
  error: string | null;
}

const initialState: scheduleState = {
  isSettingsDrawerOpen: false,
  isScheduleDrawerOpen: false,
  workingDays: [],
  workingHours: 8,
  teamData: [],
  dateList: {},
  loading: false,
  error: null,
};

export const fetchTeamData = createAsyncThunk(
  'schedule/fetchTeamData',
  async () => {
    const response = await fetch('/scheduler-data/team-data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch team data');
    }
    const data = await response.json();
    return data;
  }
);

export const fetchDateList = createAsyncThunk(
  'schedule/fetchDateList',
  async () => {
    const response = await fetch('/scheduler-data/dates-list.json');
    if (!response.ok) {
      throw new Error('Failed to fetch date list');
    }
    const data = await response.json();
    return data;
  }
);


export const updateWorking = createAsyncThunk(
  'schedule/updateWorking',
  async ({ workingDays, workingHours }: { workingDays: string[], workingHours: number }) => {
    const response = await scheduleAPIService.updateScheduleSettings({ workingDays, workingHours });
    if (!response.done) {
      throw new Error('Failed to fetch date list');
    }
    const data = response.body;
    return data;
  }
);

export const getWorking = createAsyncThunk(
  'schedule/getWorking',
  async (_, { rejectWithValue }) => {
    try {
      const response = await scheduleAPIService.fetchScheduleSettings();
      if (!response.done) {
        throw new Error('Failed to fetch date list');
      }
      return response;
    } catch (error) {
      logger.error('getWorking', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to getWorking');
    }
  }
);

const scheduleSlice = createSlice({
  name: 'scheduleReducer',
  initialState,
  reducers: {
    toggleSettingsDrawer: (state) => {
      state.isSettingsDrawerOpen = !state.isSettingsDrawerOpen;
    },
    updateSettings(state, action) {
      state.workingDays = action.payload.workingDays;
      state.workingHours = action.payload.workingHours;
    },
    toggleScheduleDrawer: (state) => {
      state.isScheduleDrawerOpen = !state.isScheduleDrawerOpen;
    },
    getWorkingSettings(state, action) {
      state.workingDays = action.payload.workingDays;
      state.workingHours = action.payload.workingHours;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamData.fulfilled, (state, action) => {
        state.teamData = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeamData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch team data';
      })
      .addCase(fetchDateList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDateList.fulfilled, (state, action) => {
        state.dateList = action.payload;
        state.loading = false;
      })
      .addCase(fetchDateList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch date list';
      })
      .addCase(updateWorking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWorking.fulfilled, (state, action) => {
        state.workingDays = action.payload.workingDays;
        state.workingHours = action.payload.workingHours;
        state.loading = false;
      })
      .addCase(updateWorking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch date list';
      })
      .addCase(getWorking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWorking.fulfilled, (state, action) => {
        state.workingDays = action.payload.body.workingDays;
        state.workingHours = action.payload.body.workingHours;
        state.loading = false;
      })
      .addCase(getWorking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch list';
      })
      ;
  },
});

export const { toggleSettingsDrawer, updateSettings, toggleScheduleDrawer, getWorkingSettings } =
  scheduleSlice.actions;
export default scheduleSlice.reducer;
