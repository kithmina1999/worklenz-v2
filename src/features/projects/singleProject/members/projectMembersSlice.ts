import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { ProjectMemberType } from '../../../../types/projectMember.types';

type ProjectMembersState = {
  membersList: ProjectMemberType[] | null;
  isDrawerOpen: boolean;
};

const initialState: ProjectMembersState = {
  membersList: [
    {
      memberId: nanoid(),
      memberName: 'Sachintha Prasad',
      memberEmail: 'prasadsachintha1231@gmail.com',
      memberRole: 'owner',
      totalAssignedTasks: 3,
      completedTasks: 1,
    },
    {
      memberId: nanoid(),
      memberName: 'Raveesha Dilanka',
      memberEmail: 'raveesha@gmail.com',
      memberRole: 'admin',
      totalAssignedTasks: 4,
      completedTasks: 2,
    },
    {
      memberId: nanoid(),
      memberName: 'Amal perera',
      memberEmail: 'amal@gmail.com',
      memberRole: 'member',
      totalAssignedTasks: 2,
      completedTasks: 2,
    },
  ],
  isDrawerOpen: false,
};

const projectMembersSlice = createSlice({
  name: 'projectMemberSlice',
  initialState,
  reducers: {
    toggleProjectMemberDrawer: (state) => {
      state.isDrawerOpen
        ? (state.isDrawerOpen = false)
        : (state.isDrawerOpen = true);
    },
    addProjectMember: (state, action: PayloadAction<ProjectMemberType>) => {
      state.membersList?.push(action.payload);
    },
  },
});

export const { toggleProjectMemberDrawer, addProjectMember } =
  projectMembersSlice.actions;
export default projectMembersSlice.reducer;
