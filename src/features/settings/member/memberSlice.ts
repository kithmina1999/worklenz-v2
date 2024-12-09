import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { MemberType } from '../../../types/member.types';

type MemberState = {
  owner: MemberType;
  membersList: MemberType[];
  isUpdateMemberDrawerOpen: boolean;
  isInviteMemberDrawerOpen: boolean;
};

const initialState: MemberState = {
  owner: {
    memberId: nanoid(),
    memberName: 'Sachintha Prasad',
    memberEmail: 'prasadsachintha1231@gmail.com',
    memberRole: 'owner',
    isActivate: true,
    isInivitationAccept: true,
  },
  membersList: [],
  isUpdateMemberDrawerOpen: false,
  isInviteMemberDrawerOpen: false,
};

const memberSlice = createSlice({
  name: 'memberReducer',
  initialState,
  reducers: {
    toggleInviteMemberDrawer: (state) => {
      state.isInviteMemberDrawerOpen
        ? (state.isInviteMemberDrawerOpen = false)
        : (state.isInviteMemberDrawerOpen = true);
    },
    toggleUpdateMemberDrawer: (state) => {
      state.isUpdateMemberDrawerOpen
        ? (state.isUpdateMemberDrawerOpen = false)
        : (state.isUpdateMemberDrawerOpen = true);
    },
    addMember: (state, action: PayloadAction<MemberType>) => {
      state.membersList.push(action.payload);
    },
    toggleMemberStatus: (state, action: PayloadAction<MemberType>) => {
      const index = state.membersList.findIndex(
        (member) => member.memberId === action.payload.memberId
      );
      if (index >= 0) {
        state.membersList[index].isActivate
          ? (state.membersList[index].isActivate = false)
          : (state.membersList[index].isActivate = true);
      }
    },
    updateMember: (state, action: PayloadAction<MemberType>) => {
      const index = state.membersList.findIndex(
        (member) => member.memberId === action.payload.memberId
      );
      if (index >= 0) {
        state.membersList[index] = action.payload;
      }
    },
    deleteMember: (state, action: PayloadAction<string>) => {
      state.membersList = state.membersList.filter(
        (member) => member.memberId !== action.payload
      );
    },
  },
});

export const {
  toggleInviteMemberDrawer,
  toggleUpdateMemberDrawer,
  addMember,
  toggleMemberStatus,
  updateMember,
  deleteMember,
} = memberSlice.actions;
export default memberSlice.reducer;
