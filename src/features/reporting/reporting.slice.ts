import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReportingState {
  includeArchivedProjects: boolean;
  selectedProjectIds: string[];
  selectedTeamIds: string[];
}

const initialState: ReportingState = {
  includeArchivedProjects: false,
  selectedProjectIds: [],
  selectedTeamIds: []
};

const reportingSlice = createSlice({
  name: 'reporting',
  initialState,
  reducers: {
    toggleIncludeArchived: (state) => {
      state.includeArchivedProjects = !state.includeArchivedProjects;
    },
    setSelectedProjects: (state, action: PayloadAction<string[]>) => {
      state.selectedProjectIds = action.payload;
    },
    setSelectedTeams: (state, action: PayloadAction<string[]>) => {
      state.selectedTeamIds = action.payload;
    },
    clearSelections: (state) => {
      state.selectedProjectIds = [];
      state.selectedTeamIds = [];
    }
  }
});

export const { 
  toggleIncludeArchived,
  setSelectedProjects,
  setSelectedTeams,
  clearSelections
} = reportingSlice.actions;

export default reportingSlice.reducer;
