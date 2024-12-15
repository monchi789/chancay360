import {LoginCredentials} from "@/modules/auth/types/auth.ts";
import axiosInstance from "@/config/axios.ts";

const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await axiosInstance.post('auth/login', credentials);

      if (response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        return {
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        }
      }

      new Error('Dont provide accessToken and refreshToken');
    } catch {
      throw new Error('Error to login');
    }
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      const response = await axiosInstance.post('auth/refresh', {refreshToken});

      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        return response.data.accessToken;
      }
    } catch (error) {
      authService.logout();
      throw error
    }
  },
  
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

export default authService;
