import { createSlice } from '@reduxjs/toolkit'
import { MemberType } from '../../../types/member'

type addMemberState = {
    member: MemberType
    isDrawerOpen: boolean
}

const initialState: addMemberState = {
    member: {},
    isDrawerOpen: false,
}

const addMemberSlice = createSlice({
    name: 'addMemberReducer',
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.isDrawerOpen
                ? (state.isDrawerOpen = false)
                : (state.isDrawerOpen = true)
        },
    },
})

export const { toggleDrawer } = addMemberSlice.actions
export default addMemberSlice.reducer
