import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Status {
  name: string;
  category: string;
  color: string;
}

interface StatusState {
  isCreateStatusDrawerOpen: boolean;
  status: Status[];
}

const initialState: StatusState = {
  isCreateStatusDrawerOpen: false,
  status: [
    {
      name: 'todo',
      category: 'todo',
      color: '#d1d0d3',
    },
    {
      name: 'doing',
      category: 'doing',
      color: '#b9cef1',
    },
    {
      name: 'done',
      category: 'done',
      color: '#c2e4d0',
    },
  ],
};

const statusSlice = createSlice({
  name: 'statusReducer',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isCreateStatusDrawerOpen
        ? (state.isCreateStatusDrawerOpen = false)
        : (state.isCreateStatusDrawerOpen = true);
    },
    addStatus: (state, action: PayloadAction<Status>) => {
      state.status.push(action.payload);
    },
  },
});

export const { toggleDrawer, addStatus } = statusSlice.actions;
export default statusSlice.reducer;
