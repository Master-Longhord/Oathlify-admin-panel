import apiClient from './apiClient';

export const completeOnboarding = async (): Promise<void> => {
  try {
    await apiClient.patch('/profile/complete-onboarding');
  } catch (error) {
    console.error("Failed to mark onboarding as complete:", error);
    throw error;
  }
};
