import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LabelType } from '../../../types/label.type'

type LabelState = {
    labelList: LabelType[]
}

const initialState: LabelState = {
    labelList: [
        { labelId: 'label1', labelName: 'Bug', labelColor: '#dcbfe3' },
        { labelId: 'label2', labelName: 'Test', labelColor: '#bce0cd' },
    ],
}

const labelSlice = createSlice({
    name: 'labelReducer',
    initialState,
    reducers: {
        addLabel: (state, action: PayloadAction<LabelType>) => {
            state.labelList.push(action.payload)
        },
    },
})

export const { addLabel } = labelSlice.actions
export default labelSlice.reducer
