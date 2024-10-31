import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatusType } from '../../../../types/status.types';

type ProjectWiseStatusListType = {
  projectId: string;
  statusList: StatusType[];
};

type StatusState = {
  isStatusDrawerOpen: boolean;
  projectWiseStatusList: ProjectWiseStatusListType[];
};

export const defaultStatusList: StatusType[] = [
  {
    statusId: '1',
    statusName: 'To do',
    statusCategory: 'todo',
  },
  {
    statusId: '2',
    statusName: 'Doing',
    statusCategory: 'doing',
  },
  {
    statusId: '3',
    statusName: 'Done',
    statusCategory: 'done',
  },
];

const initialState: StatusState = {
  isStatusDrawerOpen: false,
  projectWiseStatusList: [
    {
      projectId: 'YAu9wUxwdvXPLvd9M3pfn',
      statusList: [...defaultStatusList],
    },
  ],
};

const statusSlice = createSlice({
  name: 'statusReducer',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isStatusDrawerOpen
        ? (state.isStatusDrawerOpen = false)
        : (state.isStatusDrawerOpen = true);
    },

    addStatus: (
      state,
      action: PayloadAction<{ projectId: string; status: StatusType }>
    ) => {
      const { projectId, status } = action.payload;

      const index = state.projectWiseStatusList.findIndex(
        (statusList) => statusList.projectId === projectId
      );

      if (index !== -1) {
        state.projectWiseStatusList[index].statusList.push(status);
      }
    },

    deleteStatus: (
      state,
      action: PayloadAction<{ projectId: string; statusId: string }>
    ) => {
      const { projectId, statusId } = action.payload;

      const index = state.projectWiseStatusList.findIndex(
        (statusList) => statusList.projectId === projectId
      );

      if (index !== -1) {
        state.projectWiseStatusList[index].statusList.filter(
          (status) => status.statusId !== statusId
        );
      }
    },
  },
});

export const { toggleDrawer, addStatus, deleteStatus } = statusSlice.actions;
export default statusSlice.reducer;
