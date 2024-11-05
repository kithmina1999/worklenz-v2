import { createAsyncThunk, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { teamsApiService } from '@/api/teams/teams.api.service';
import logger from '@/utils/errorLogger';
import { ITeam, ITeamGetResponse, ITeamState } from '@/types/teams/team.type';
import { API_BASE_URL } from '@/shared/constants';

const initialState: ITeamState = {
  teamsList: [],
  isDrawerOpen: false,
  isSettingDrawerOpen: false,
  isUpdateTitleNameModalOpen: false,
  loading: false,
  error: null,
};

// Create async thunk for fetching teams
export const fetchTeams = createAsyncThunk(`${API_BASE_URL}/teams`, async (_, { rejectWithValue }) => {
  try {
    const teamsResponse = await teamsApiService.getTeams();
    return teamsResponse.body;
  } catch (error) {
    logger.error('Fetch Teams', error);
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Failed to fetch teams');
  }
});

// Initialization thunk
export const initializeTeams = createAsyncThunk(
    'team/initialize',
    async (_, { dispatch, getState }) => {
      const state = getState() as { teamReducer: ITeamState };
      if (!state.teamReducer.initialized) {
        await dispatch(fetchTeams());
      }
    }
);

const teamSlice = createSlice({
  name: 'teamReducer',
  initialState,
  reducers: {
    toggleDrawer: state => {
      state.isDrawerOpen ? (state.isDrawerOpen = false) : (state.isDrawerOpen = true);
    },
    addTeam: (state, action: PayloadAction<ITeam>) => {
      state.teamsList.push(action.payload);
    },
    toggleSettingDrawer: state => {
      state.isSettingDrawerOpen
        ? (state.isSettingDrawerOpen = false)
        : (state.isSettingDrawerOpen = true);
    },
    updateTeam: (state, action: PayloadAction<ITeam>) => {
      const index = state.teamsList.findIndex(team => (team.id === action.payload.id));
      state.teamsList[index] = action.payload;
    },
    deleteTeam: (state, action: PayloadAction<string>) => {
      state.teamsList = state.teamsList.filter(team => (team.id !== action.payload));
    },
    editTeamName: (state, action: PayloadAction<ITeam>) => {
      const index = state.teamsList.findIndex(team => (team.id === action.payload.id));
      if (index >= 0) {
        state.teamsList[index] = action.payload;
      }
    },
    toggleUpdateTeamNameModal: state => {
      state.isUpdateTitleNameModalOpen
        ? (state.isUpdateTitleNameModalOpen = false)
        : (state.isUpdateTitleNameModalOpen = true);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action: PayloadAction<ITeamGetResponse[]>) => {
        state.loading = false;
        state.teamsList = action.payload;
        state.error = null;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to fetch teams';
      });
  },
});

export const {
  toggleDrawer,
  addTeam,
  toggleSettingDrawer,
  updateTeam,
  deleteTeam,
  editTeamName,
  toggleUpdateTeamNameModal
} = teamSlice.actions;
export default teamSlice.reducer;
