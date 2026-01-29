import apiClient from './apiClient';
import type { Template, CreateTemplateDTO } from '../types/template.d';

export const getPlatformTemplates = async (): Promise<Template[]> => {
  try {
    const response = await apiClient.get('/platform/templates');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch templates:", error);
    throw error;
  }
};

export const getTemplateById = async (id: string): Promise<Template> => {
  try {
    const response = await apiClient.get(`/platform/templates/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch template ${id}:`, error);
    throw error;
  }
};

export const createPlatformTemplate = async (data: CreateTemplateDTO): Promise<Template> => {
  try {
    const response = await apiClient.post('/platform/templates', data);
    return response.data;
  } catch (error) {
    console.error("Failed to create template:", error);
    throw error;
  }
};

export const deletePlatformTemplate = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/platform/templates/${id}`);
  } catch (error) {
    console.error(`Failed to delete template ${id}:`, error);
    throw error;
  }
};

export const updatePlatformTemplate = async (id: string, data: CreateTemplateDTO): Promise<Template> => {
  try {
    const response = await apiClient.patch(`/platform/templates/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to update template ${id}:`, error);
    throw error;
  }
};
