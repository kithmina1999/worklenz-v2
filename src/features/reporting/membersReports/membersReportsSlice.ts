import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type MembersReportsState = {
  isMembersReportsDrawerOpen: boolean;
  membersList: any[];
  isLoading: boolean;
  error: string | null;
};

// async thunk for fetching members data
export const fetchMembersData = createAsyncThunk(
  'membersReports/fetchMembersData',
  async () => {
    const response = await fetch(
      '/reportingMockData/membersReports/members.json'
    );
    if (!response.ok) throw new Error(`Response error: ${response.status}`);
    return await response.json();
  }
);

const initialState: MembersReportsState = {
  isMembersReportsDrawerOpen: false,
  membersList: [],
  isLoading: false,
  error: null,
};

const membersReportsSlice = createSlice({
  name: 'membersReportsReducer',
  initialState,
  reducers: {
    toggleMembersReportsDrawer: (state) => {
      state.isMembersReportsDrawerOpen = !state.isMembersReportsDrawerOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembersData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMembersData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.membersList = action.payload;
      })
      .addCase(fetchMembersData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch members data';
      });
  },
});

export const { toggleMembersReportsDrawer } = membersReportsSlice.actions;
export default membersReportsSlice.reducer;
