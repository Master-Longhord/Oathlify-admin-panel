import apiClient from './apiClient';
import type { User, UserDetail } from '../types/user.d';

// --- LAWYER (ADMIN) ENDPOINTS ---

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get('/admin/users');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

export const getUserById = async (id: string): Promise<UserDetail> => {
  try {
    const response = await apiClient.get(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user with id ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/admin/users/${id}`);
  } catch (error) {
    console.error(`Failed to delete user with id ${id}:`, error);
    throw error;
  }
};

// --- SUPER ADMIN (PLATFORM) ENDPOINTS ---

export const getPlatformUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get('/platform/users');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch platform users:", error);
    throw error;
  }
};

export const getPlatformUserById = async (id: string): Promise<UserDetail> => {
  try {
    const response = await apiClient.get(`/platform/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch platform user with id ${id}:`, error);
    throw error;
  }
};

export const deletePlatformUser = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/platform/users/${id}`);
  } catch (error) {
    console.error(`Failed to delete platform user with id ${id}:`, error);
    throw error;
  }
};
