import apiClient from './apiClient';

export interface DashboardStats {
  totalUsers: number;
  waitlistCount: number;
  pendingKyc: number;
  pendingAffidavits: number;
  totalRevenue: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    throw error;
  }
};
