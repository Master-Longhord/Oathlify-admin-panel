import apiClient from './apiClient';
import type { Affidavit, AffidavitDetail } from '../types/affidavit.d';

export const getPendingAffidavits = async (): Promise<Affidavit[]> => {
  try {
    const response = await apiClient.get('/admin/affidavits?status=PAID');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch pending affidavits:", error);
    throw error;
  }
};

export const getApprovedAffidavits = async (): Promise<Affidavit[]> => {
  try {
    const response = await apiClient.get('/admin/approved-affidavits');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch approved affidavits:", error);
    throw error;
  }
};

export const getDeclinedAffidavits = async (): Promise<Affidavit[]> => {
  try {
    // Placeholder: Replace with the actual endpoint when it is available
    // const response = await apiClient.get('/admin/declined-affidavits');
    // return response.data;
    return []; // Return an empty array for now
  } catch (error) {
    console.error("Failed to fetch declined affidavits:", error);
    throw error;
  }
};

export const getAffidavitById = async (id: string): Promise<AffidavitDetail> => {
  try {
    const response = await apiClient.get(`/admin/affidavits/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch affidavit with id ${id}:`, error);
    throw error;
  }
};

export const stampAffidavit = async (id: string): Promise<AffidavitDetail> => {
  try {
    const response = await apiClient.patch(`/admin/affidavits/${id}/stamp`);
    return response.data;
  } catch (error) {
    console.error(`Failed to stamp affidavit with id ${id}:`, error);
    throw error;
  }
};
