// =============================================================================
// User API Service
// =============================================================================
// Handles all user-related API calls.
// Uses the centralized API client for consistent error handling and auth.
// =============================================================================

import { apiClient } from '@/services/api-client';
import { API_ENDPOINTS } from '@/constants/api';
import type { ApiResponse, PaginatedResponse } from '@/types';

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  role: string;
}

export const userService = {
  /**
   * Get paginated list of users.
   */
  async getUsers(page = 1, limit = 10): Promise<PaginatedResponse<UserDTO>> {
    const response = await apiClient.get<PaginatedResponse<UserDTO>>(API_ENDPOINTS.USERS.LIST, {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Get a single user by ID.
   */
  async getUserById(id: string): Promise<ApiResponse<UserDTO>> {
    const response = await apiClient.get<ApiResponse<UserDTO>>(API_ENDPOINTS.USERS.BY_ID(id));
    return response.data;
  },

  /**
   * Create a new user.
   */
  async createUser(data: CreateUserDTO): Promise<ApiResponse<UserDTO>> {
    const response = await apiClient.post<ApiResponse<UserDTO>>(API_ENDPOINTS.USERS.CREATE, data);
    return response.data;
  },

  /**
   * Update an existing user.
   */
  async updateUser(id: string, data: Partial<CreateUserDTO>): Promise<ApiResponse<UserDTO>> {
    const response = await apiClient.patch<ApiResponse<UserDTO>>(API_ENDPOINTS.USERS.UPDATE(id), data);
    return response.data;
  },

  /**
   * Delete a user.
   */
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
  },
};
