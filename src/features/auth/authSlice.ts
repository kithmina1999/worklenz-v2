import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authApiService } from '@/api/auth/auth.api.service';
import { IAuthState, IUserLoginRequest } from '@/types/auth/login.types';
import { IUserSignUpRequest } from '@/types/auth/signup.types';
import logger from '@/utils/errorLogger';
import alertService from '@/services/alerts/alertService';

// Initial state
const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  teamId: undefined,
  projectId: undefined,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: IUserLoginRequest, { rejectWithValue }) => {
    try {
      await authApiService.login(credentials);
      const authorizeResponse = await authApiService.verify();

      if (!authorizeResponse.authenticated) {
        return rejectWithValue(authorizeResponse.auth_error || 'Authorization failed');
      }

      return authorizeResponse;
    } catch (error: any) {
      logger.error('Login', error);
      return rejectWithValue(error.response?.data?.message || 'An unknown error has occurred');
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signup',
  async (credentials: IUserSignUpRequest, { rejectWithValue }) => {
    try {
      await authApiService.signUp(credentials);
      const authorizeResponse = await authApiService.verify();

      if (!authorizeResponse.authenticated) {
        return rejectWithValue(authorizeResponse.auth_error || 'Authorization failed');
      }

      if (authorizeResponse.authenticated) {
        localStorage.setItem('session', JSON.stringify(authorizeResponse.user));
      }

      return authorizeResponse;
    } catch (error: any) {
      logger.error('SignUp', error);
      return rejectWithValue(error.response?.data?.message || 'An unknown error has occurred');
    }
  }
);

export const logout = createAsyncThunk(
  'secure/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApiService.logout();
      if (!response.done) {
        return rejectWithValue(response.message || 'Logout failed');
      }
      return response;
    } catch (error: any) {
      logger.error('Logout', error);
      return rejectWithValue(error.response?.data?.message || 'An unknown error has occurred');
    }
  }
);

export const verifyAuthentication = createAsyncThunk(
  'secure/verify',
  async () => {
    const response = await authApiService.verify();
    return response;
  }
);

// Slice
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
      // Login cases
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

      // Logout cases
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

      // Verify authentication cases
      .addCase(verifyAuthentication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyAuthentication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload.user;
      })
      .addCase(verifyAuthentication.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setTeamAndProject } = authSlice.actions;
export default authSlice.reducer;
