import { apiClient } from '@/lib/api-client';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessage?: Message;
  updatedAt: string;
}

export interface CreateMessageRequest {
  conversationId: string;
  content: string;
}

class ChatService {
  async getConversations(): Promise<Conversation[]> {
    const response = await apiClient.get<Conversation[]>('/chat/conversations');
    return response.data;
  }

  async getConversation(id: string): Promise<Conversation> {
    const response = await apiClient.get<Conversation>(`/chat/conversations/${id}`);
    return response.data;
  }

  async getMessages(conversationId: string, page = 1): Promise<Message[]> {
    const response = await apiClient.get<Message[]>(
      `/chat/conversations/${conversationId}/messages`,
      { params: { page } }
    );
    return response.data;
  }

  async sendMessage(data: CreateMessageRequest): Promise<Message> {
    const response = await apiClient.post<Message>('/chat/messages', data);
    return response.data;
  }
}

export const chatService = new ChatService();
