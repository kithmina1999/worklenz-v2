import { createSlice } from '@reduxjs/toolkit';

interface createCardState {
  isCardDisable: boolean;
}

const initialState: createCardState = {
  isCardDisable: true,
};

const createCardSlice = createSlice({
  name: 'createCard',
  initialState,
  reducers: {
    setCardDisabled: (state, action) => {
      state.isCardDisable = action.payload;
    },
  },
});

export const { setCardDisabled } = createCardSlice.actions;
export default createCardSlice.reducer;
