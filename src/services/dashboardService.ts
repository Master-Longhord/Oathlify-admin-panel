import apiClient from './apiClient';

export interface AdminStats {
  pendingAffidavits: number;
  pendingKyc: number;
  documentsStampedToday: number;
}

export const getAdminStats = async (): Promise<AdminStats> => {
  try {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    throw error;
  }
};
