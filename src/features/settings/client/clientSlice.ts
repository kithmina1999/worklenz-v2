import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IClient, IClientsViewModel } from '@/types/client.types';
import logger from '@/utils/errorLogger';
import { clientsApiService } from '@/api/clients/clients.api.service';

type ClientState = {
  clients: IClientsViewModel;
  isUpdateClientDrawerOpen: boolean;
  isCreateClientDrawerOpen: boolean;
  loading: boolean;
};

const initialState: ClientState = {
  clients: {
    total: 0,
    data: [],
  },
  isUpdateClientDrawerOpen: false,
  isCreateClientDrawerOpen: false,
  loading: false,
};

interface FetchClientsParams {
  index: number;
  size: number;
  field: string | null;
  order: string | null;
  search: string | null;
}

// Async thunks
export const fetchClients = createAsyncThunk(
  'clients/fetchAll',
  async (params: FetchClientsParams, { rejectWithValue }) => {
    try {
      const response = await clientsApiService.getClients(params.index, params.size, params.field, params.order, params.search);
      return response.body;
    } catch (error) {
      logger.error('Fetch Clients', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch clients');
    }
  }
);

const clientSlice = createSlice({
  name: 'clientReducer',
  initialState,
  reducers: {
    toggleCreateClientDrawer: state => {
      state.isCreateClientDrawerOpen
        ? (state.isCreateClientDrawerOpen = false)
        : (state.isCreateClientDrawerOpen = true);
    },
    toggleUpdateClientDrawer: state => {
      state.isUpdateClientDrawerOpen
        ? (state.isUpdateClientDrawerOpen = false)
        : (state.isUpdateClientDrawerOpen = true);
    },
    // action for create client
    addClient: (state, action: PayloadAction<IClient>) => {
      state.clients.data?.push(action.payload);
    },
    // action for update client
    updateClient: (state, action: PayloadAction<IClient>) => {

    },
    // action for delete client
    deleteClient: (state, action: PayloadAction<string>) => {
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  toggleCreateClientDrawer,
  toggleUpdateClientDrawer,
  addClient,
  updateClient,
  deleteClient,
} = clientSlice.actions;
export default clientSlice.reducer;
