import { apiClient } from '@/lib/api-client';
import type {
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from '@/lib/types/auth';

class AuthService {
  async login(credentials: LoginRequest): Promise<{ user: User }> {
    const response = await apiClient.post<AuthResponse>(
      '/auth/login',
      credentials
    );

    return {
      user: response.data.data.user,
    };
  }

  async register(data: RegisterRequest): Promise<{ user: User }> {
    const { confirmPassword, ...payload } = data;
    const response = await apiClient.post<AuthResponse>(
      '/auth/register',
      payload
    );
    return {
      user: response.data.data.user,
    };
  }

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiClient.get('/users/me');
      return response.data.data;
    } catch (error) {
      return null;
    }
  }

  async refreshSession(): Promise<void> {
    await apiClient.post('/auth/refresh');
  }

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email });
  }

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    const { confirmPassword, ...payload } = data;
    await apiClient.post('/auth/reset-password', payload);
  }


}

export const authService = new AuthService();
