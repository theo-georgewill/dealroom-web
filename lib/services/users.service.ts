import { apiClient } from '@/lib/api-client';
import type { User } from '@/lib/types/auth';

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  avatar?: string;
}

class UsersService {
  async getUser(id: string): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  }

  async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    const response = await apiClient.patch<User>(`/users/${id}`, data);
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  }

  async listUsers(page = 1, limit = 10): Promise<{ users: User[]; total: number }> {
    const response = await apiClient.get<{ users: User[]; total: number }>('/users', {
      params: { page, limit },
    });
    return response.data;
  }
}

export const usersService = new UsersService();
