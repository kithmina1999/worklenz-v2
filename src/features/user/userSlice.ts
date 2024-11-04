import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/types/auth/login.types';
import { ILocalSession } from '@/types/auth/local-session.types';

const initialState: IUser = {
  id: '',
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    changeUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUser: (state, action: PayloadAction<ILocalSession>) => {
      state = action.payload;
    },
  },
});

export const { changeUserName, setUser } = userSlice.actions;
export default userSlice.reducer;
