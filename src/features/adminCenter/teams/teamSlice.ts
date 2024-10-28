import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TeamsType } from '../../../types/adminCenter/team.types';

interface teamState {
  teamsList: TeamsType[];
  isDrawerOpen: boolean;
  isSettingDrawerOpen: boolean;
  isUpdateTitleNameModalOpen: boolean;
}

const initialState: teamState = {
  teamsList: [
    {
      teamId: nanoid(),
      teamName: 'Raveesha Dilanka',
      membersCount: 1,
      owner: 'Raveesha Dilanka',
      members: ['Raveesha Dilanka'],
      created: new Date('2024-05-08T08:30:00'),
      isActive: true,
    },
  ],
  isDrawerOpen: false,
  isSettingDrawerOpen: false,
  isUpdateTitleNameModalOpen: false,
};

const teamSlice = createSlice({
  name: 'teamReducer',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isDrawerOpen
        ? (state.isDrawerOpen = false)
        : (state.isDrawerOpen = true);
    },
    addTeam: (state, action: PayloadAction<TeamsType>) => {
      state.teamsList.push(action.payload);
    },
    toggleSettingDrawer: (state) => {
      state.isSettingDrawerOpen
        ? (state.isSettingDrawerOpen = false)
        : (state.isSettingDrawerOpen = true);
    },
    updateTeam: (state, action: PayloadAction<TeamsType>) => {
      const index = state.teamsList.findIndex(
        (team) => team.teamId === action.payload.teamId
      );
      state.teamsList[index] = action.payload;
    },
    deleteTeam: (state, action: PayloadAction<string>) => {
      state.teamsList = state.teamsList.filter(
        (team) => team.teamId !== action.payload
      );
    },
    editTeamName: (state, action: PayloadAction<TeamsType>) => {
      const index = state.teamsList.findIndex(
        (team) => team.teamId === action.payload.teamId
      );
      if (index >= 0) {
        state.teamsList[index] = action.payload;
      }
    },
    toggleUpdateTeamNameModal: (state) => {
      state.isUpdateTitleNameModalOpen
        ? (state.isUpdateTitleNameModalOpen = false)
        : (state.isUpdateTitleNameModalOpen = true);
    },
    setTeamActive: (state, action: PayloadAction<string>) => {
      state.teamsList.forEach(
        (team) => (team.isActive = team.teamId === action.payload)
      );
    },
  },
});

export const {
  toggleDrawer,
  addTeam,
  toggleSettingDrawer,
  updateTeam,
  deleteTeam,
  editTeamName,
  toggleUpdateTeamNameModal,
  setTeamActive,
} = teamSlice.actions;
export default teamSlice.reducer;
