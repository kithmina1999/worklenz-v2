import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ClientType } from '../../../types/client'

type ClientState = {
    clientsList: ClientType[]
    isDrawerOpen: boolean
}

const initialState: ClientState = {
    clientsList: [],
    isDrawerOpen: false,
}

const clientSlice = createSlice({
    name: 'clientReducer',
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.isDrawerOpen
                ? (state.isDrawerOpen = false)
                : (state.isDrawerOpen = true)
        },
        // action for create client
        addClient: (state, action: PayloadAction<ClientType>) => {
            state.clientsList.push(action.payload)
        },
    },
})

export const { toggleDrawer, addClient } = clientSlice.actions
export default clientSlice.reducer
