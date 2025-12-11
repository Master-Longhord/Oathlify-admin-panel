import apiClient from './apiClient';
import type { User, UserDetail } from '../types/user.d';

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
