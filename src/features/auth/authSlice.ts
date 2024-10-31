import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authService } from '@/api/auth/authService';
import { AuthState, IUserLoginRequest } from '@/types/auth/login.types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  teamId: undefined,
  projectId: undefined,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: IUserLoginRequest, { rejectWithValue }) => {
    try {
      const loginResponse = await authService.login(credentials);
      if (!loginResponse.done) {
        return rejectWithValue(loginResponse.message || 'Login failed');
      }
      
      const authorizeResponse = await authService.verify();
      if (!authorizeResponse.authenticated) {
        return rejectWithValue(authorizeResponse.auth_error || 'Authorization failed');
      }

      return authorizeResponse;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || 'An unknown error has occurred');
    }
  }
);

export const logout = createAsyncThunk(
  'secure/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.logout();
      if (!response.done) {
        return rejectWithValue(response.message || 'Logout failed');
      }
      return response;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || 'An unknown error has occurred');
    }
  }
);

export const verifyAuth = createAsyncThunk(
  'secure/verify',
  async () => {
    const user = await authService.verify();
    return user;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTeamAndProject: (state, action: { payload: { teamId?: string; projectId?: string } }) => {
      state.teamId = action.payload.teamId;
      state.projectId = action.payload.projectId;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases...
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      // Logout cases...
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.teamId = undefined;
        state.projectId = undefined;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Check Auth
      .addCase(verifyAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload.user;
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setTeamAndProject } = authSlice.actions;
export default authSlice.reducer;
