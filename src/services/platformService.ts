import apiClient from './apiClient';

export interface PlatformStats {
  totalRevenue: number;
  totalUsers: number;
  waitlistCount: number;
}

export const getPlatformStats = async (): Promise<PlatformStats> => {
  try {
    const response = await apiClient.get('/platform/stats');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch platform stats:", error);
    throw error;
  }
};