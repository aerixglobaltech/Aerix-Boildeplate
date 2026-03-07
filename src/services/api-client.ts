// =============================================================================
// Centralized API Client
// =============================================================================
// Axios-based HTTP client with interceptors for token injection,
// error handling, and request/response transformation.
//
// Usage:
//   import { apiClient } from '@/services/api-client';
//   const response = await apiClient.get('/users');
// =============================================================================

import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

import { clientEnv } from '@/config/env';
import { API_CONFIG, STORAGE_KEYS } from '@/constants';
import type { ApiError } from '@/types';

// =============================================================================
// Create Axios Instance
// =============================================================================

const apiClient: AxiosInstance = axios.create({
  baseURL: clientEnv.API_URL,
  timeout: API_CONFIG.TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// =============================================================================
// Request Interceptor
// =============================================================================
// Automatically injects the auth token into every outgoing request.
// Token is read from localStorage (client-side) for API calls.
// =============================================================================

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Inject bearer token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth-token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// =============================================================================
// Response Interceptor
// =============================================================================
// Handles common error scenarios globally:
// - 401 Unauthorized → Clear session and redirect to login
// - 403 Forbidden → Permission denied handling
// - 500+ Server Error → Generic error handling
// =============================================================================

apiClient.interceptors.response.use(
  (response) => {
    // Return the response data directly for cleaner usage
    return response;
  },
  (error: AxiosError<ApiError>) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    switch (status) {
      case 401:
        // Token expired or invalid — clear local auth state
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-token');
          // Redirect to login if not already there
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login?session=expired';
          }
        }
        break;

      case 403:
        console.error('[API] Forbidden:', message);
        break;

      case 404:
        console.error('[API] Not Found:', message);
        break;

      case 422:
        // Validation errors — let the caller handle these
        console.error('[API] Validation Error:', error.response?.data?.errors);
        break;

      case 429:
        console.error('[API] Rate Limited:', message);
        break;

      default:
        if (status && status >= 500) {
          console.error('[API] Server Error:', message);
        }
        break;
    }

    return Promise.reject(error);
  },
);

export { apiClient };
