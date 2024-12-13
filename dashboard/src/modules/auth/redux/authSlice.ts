import {AuthState, LoginCredentials} from "@/modules/auth/types/auth.ts";
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from "@/modules/auth/redux/authService.ts";
import Cookies from 'js-cookie';

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const response = await authService.login(credentials);

      if (!response || !response.accessToken || !response.refreshToken) {
        return {error: 'Access token or refresh token not provided'};
      }

      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      Cookies.set('accessToken', response.accessToken, {
        expires: 1,
        secure: process.env.NODE_ENV === 'production'
      });

      return response;
    } catch (error) {
      let message = 'Login failed';

      if (error instanceof Error) {
        if ('response' in error && typeof error.response === 'object' && error.response !== null) {
          message = error.message || 'Error to initialize login';
        } else {
          message = error.message || 'Error to initialize login';
        }
      }

      return thunkAPI.rejectWithValue(message)
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      Cookies.remove('accessToken');

      return true;
    } catch (error) {
      let message = 'Logout failed';

      if (error instanceof Error) {
        if ('response' in error && typeof error.response === 'object' && error.response !== null) {
          message = error.message || 'Error to initialize logout';
        } else {
          message = error.message || 'Error to initialize logout';
        }
      }

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkAPI) => {
    try {
      const newAccessToken = await authService.refreshToken();

      localStorage.setItem('accessToken', newAccessToken);
      Cookies.set('accessToken', newAccessToken, {
        expires: 1,
        secure: process.env.NODE_ENV === 'production'
      });

      return newAccessToken;
    } catch (error) {
      thunkAPI.dispatch(logout());
      throw error;
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if ('user' in action.payload && 'accessToken' in action.payload && 'refreshToken' in action.payload) {
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })

      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      });
  }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;
