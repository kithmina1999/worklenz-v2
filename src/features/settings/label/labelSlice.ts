import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LabelType } from '../../../types/label.type';

type LabelState = {
  labelList: LabelType[];
};

const initialState: LabelState = {
  labelList: [
    { labelId: 'label1', labelName: 'Bug', labelColor: '#dcbfe3' },
    { labelId: 'label2', labelName: 'Test', labelColor: '#bce0cd' },
    {
      labelId: 'label3',
      labelName: 'Documentation',
      labelColor: '#a3c4dc',
    },
    {
      labelId: 'label4',
      labelName: 'Template',
      labelColor: '#e2dcbf',
    },
    {
      labelId: 'label5',
      labelName: 'UI',
      labelColor: '#dce3a3',
    },
  ],
};

const labelSlice = createSlice({
  name: 'labelReducer',
  initialState,
  reducers: {
    // action for add label
    addLabel: (state, action: PayloadAction<LabelType>) => {
      state.labelList.push(action.payload);
    },
    // action for delete label
    deleteLabel: (state, action: PayloadAction<string>) => {
      state.labelList = state.labelList.filter(
        (label) => label.labelId !== action.payload
      );
    },
  },
});

export const { addLabel, deleteLabel } = labelSlice.actions;
export default labelSlice.reducer;
