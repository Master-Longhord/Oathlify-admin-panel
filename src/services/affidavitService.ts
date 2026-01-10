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
    return [];
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

export const getPreviewPdf = async (id: string): Promise<Blob> => {
  try {
    const response = await apiClient.get(`/admin/affidavits/${id}/preview-pdf`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to load PDF preview for affidavit ${id}:`, error);
    throw error;
  }
};

export const getVideoUrl = async (id: string): Promise<{ videoUrl: string }> => {
  try {
    const response = await apiClient.get(`/admin/affidavits/${id}/video-url`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get video URL for affidavit ${id}:`, error);
    throw error;
  }
};
