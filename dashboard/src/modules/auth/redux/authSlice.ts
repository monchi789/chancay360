import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, GoogleRedirectResponse, LoginCredentials, LoginResponse } from "@/modules/auth/types/auth";
import authService from "@/modules/auth/redux/authService";

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const login = createAsyncThunk<LoginResponse, LoginCredentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      return await authService.login(credentials);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      authService.logout();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Logout failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const refreshToken = createAsyncThunk<string, void, { rejectValue: string }>(
  'auth/refresh-token',
  async (_, thunkAPI) => {
    try {
      return await authService.refreshToken();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Token refresh failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const handleGoogleRedirect = createAsyncThunk(
  'auth/handle-google-redirect',
  async (tokens: GoogleRedirectResponse, thunkAPI) => {
    try {
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      return {
        user: tokens.user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Google login failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string || 'Usuario o contraseña incorrectos';
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<string>) => {
        state.accessToken = action.payload;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isError = true;
        state.message = action.payload || 'Token refresh failed';
      })
      .addCase(handleGoogleRedirect.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleGoogleRedirect.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(handleGoogleRedirect.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

