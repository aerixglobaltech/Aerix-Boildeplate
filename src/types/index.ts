// =============================================================================
// Global Type Definitions
// =============================================================================
// Shared types used across the application.
// Module-specific types should live in their respective modules/*/types.
// =============================================================================

/**
 * Generic API response wrapper.
 * All API responses should conform to this structure.
 */
export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
  timestamp?: string;
}

/**
 * Paginated API response.
 */
export interface PaginatedResponse<T = unknown> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
}

/**
 * Generic API error response.
 */
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

/**
 * Base entity with common fields.
 */
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Navigation item for sidebar/menus.
 */
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  badge?: string | number;
  disabled?: boolean;
}
