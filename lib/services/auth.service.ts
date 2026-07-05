import { apiClient } from '@/lib/api-client';
import type {
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from '@/lib/types/auth';

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    if (response.data.token) {
      apiClient.setAuthToken(response.data.token);
    }
    return response.data;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const { confirmPassword, ...payload } = data;
    const response = await apiClient.post<AuthResponse>('/auth/register', payload);
    if (response.data.token) {
      apiClient.setAuthToken(response.data.token);
    }
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      apiClient.clearAuthToken();
      localStorage.removeItem('currentUser');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiClient.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    });
    if (response.data.token) {
      apiClient.setAuthToken(response.data.token);
    }
    return response.data;
  }

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email });
  }

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    const { confirmPassword, ...payload } = data;
    await apiClient.post('/auth/reset-password', payload);
  }

  getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  setStoredUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  getStoredUser(): User | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  clearStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
    }
  }
}

export const authService = new AuthService();
