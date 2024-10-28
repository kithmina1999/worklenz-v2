import { createSlice } from '@reduxjs/toolkit';
import { MemberType } from '../../../../types/member.types';

type ProjectMembersState = {
  membersList: MemberType[] | null;
  isDrawerOpen: boolean;
};

const initialState: ProjectMembersState = {
  membersList: [],
  isDrawerOpen: false,
};

const projectMembersSlice = createSlice({
  name: 'projectMemberSlice',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isDrawerOpen
        ? (state.isDrawerOpen = false)
        : (state.isDrawerOpen = true);
    },
  },
});

export const { toggleDrawer } = projectMembersSlice.actions;
export default projectMembersSlice.reducer;
