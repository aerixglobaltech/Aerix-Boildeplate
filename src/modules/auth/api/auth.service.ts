// =============================================================================
// Auth API Service
// =============================================================================
// Handles all authentication-related API calls.
// Replace mock implementations with actual API endpoints when backend is ready.
// =============================================================================

import { apiClient } from '@/services/api-client';
import type { LoginCredentials, LoginResponse, User } from '@/types/auth';
import type { ApiResponse } from '@/types';

export const authService = {
  /**
   * Authenticate user with email and password.
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      credentials,
    );
    return response.data;
  },

  /**
   * Fetch the currently authenticated user's profile.
   */
  async getMe(): Promise<ApiResponse<User>> {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data;
  },

  /**
   * Refresh the access token using a refresh token.
   */
  async refreshToken(refreshToken: string): Promise<ApiResponse<{ accessToken: string }>> {
    const response = await apiClient.post<ApiResponse<{ accessToken: string }>>(
      '/auth/refresh',
      { refreshToken },
    );
    return response.data;
  },

  /**
   * Log out the current user (server-side session invalidation).
   */
  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  /**
   * Request a password reset email.
   */
  async forgotPassword(email: string): Promise<ApiResponse<null>> {
    const response = await apiClient.post<ApiResponse<null>>('/auth/forgot-password', { email });
    return response.data;
  },
};
