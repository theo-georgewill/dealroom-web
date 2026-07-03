import { apiClient } from '@/lib/api-client';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

class NotificationsService {
  async getNotifications(): Promise<Notification[]> {
    const response = await apiClient.get<Notification[]>('/notifications');
    return response.data;
  }

  async markAsRead(id: string): Promise<void> {
    await apiClient.patch(`/notifications/${id}`, { read: true });
  }

  async markAllAsRead(): Promise<void> {
    await apiClient.patch('/notifications/mark-all-read', {});
  }

  async deleteNotification(id: string): Promise<void> {
    await apiClient.delete(`/notifications/${id}`);
  }
}

export const notificationsService = new NotificationsService();
