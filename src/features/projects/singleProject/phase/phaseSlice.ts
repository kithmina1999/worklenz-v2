import { createSlice } from '@reduxjs/toolkit';
import { PhaseType } from '../../../../types/phase.types';

type PhaseState = {
  isPhaseDrawerOpen: boolean;
  phaseList: PhaseType[];
};

const initialState: PhaseState = {
  isPhaseDrawerOpen: false,
  phaseList: [
    {
      phaseId: '1',
      projectId: 'YAu9wUxwdvXPLvd9M3pfn',
      phase: 'New Phase',
      phaseOptions: [
        {
          optionId: 'option1',
          optionName: 'Phase 1',
          optionColor: '#cb9878',
        },
      ],
    },
  ],
};

const phaseSlice = createSlice({
  name: 'phaseReducer',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isPhaseDrawerOpen
        ? (state.isPhaseDrawerOpen = false)
        : (state.isPhaseDrawerOpen = true);
    },
  },
});

export const { toggleDrawer } = phaseSlice.actions;
export default phaseSlice.reducer;
