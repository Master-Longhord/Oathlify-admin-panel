import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export interface LoginResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'ADMIN';
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export const loginAdmin = async (login: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${apiBaseUrl}/auth/signin`, {
      login,
      password,
    });
    return response.data;
  } catch {
    throw new Error('Invalid credentials or server error.');
  }
};

export const refreshAccessToken = async (refreshToken: string): Promise<{ accessToken: string }> => {
  const response = await axios.post(`${apiBaseUrl}/auth/refresh-token`, {
    refreshToken,
  });
  return response.data.tokens;
};
