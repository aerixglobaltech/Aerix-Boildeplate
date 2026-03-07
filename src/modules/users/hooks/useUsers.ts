// =============================================================================
// Users React Query Hook
// =============================================================================
// Example TanStack React Query usage for data fetching.
// Shows query and mutation patterns for the users module.
// =============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { userService } from '@/modules/users/api/user.service';
import type { CreateUserDTO } from '@/modules/users/api/user.service';
import { QUERY_KEYS } from '@/constants/api';
import { PAGINATION } from '@/constants/app';

// Query keys — centralized in @/constants/api, extended here for lists/details
const userKeys = {
  all: QUERY_KEYS.USERS,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (page: number, limit: number) => [...userKeys.lists(), { page, limit }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

/**
 * Fetch paginated users list.
 */
export function useUsers(page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_PAGE_SIZE) {
  return useQuery({
    queryKey: userKeys.list(page, limit),
    queryFn: () => userService.getUsers(page, limit),
  });
}

/**
 * Fetch a single user by ID.
 */
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
  });
}

/**
 * Create a new user (mutation).
 * Automatically invalidates the users list cache on success.
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDTO) => userService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

/**
 * Delete a user (mutation).
 * Automatically invalidates the users list cache on success.
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}
