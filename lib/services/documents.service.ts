import { apiClient } from '@/lib/api-client';

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  dealId: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
}

export interface CreateDocumentRequest {
  name: string;
  dealId: string;
  file: File;
}

class DocumentsService {
  async getDocument(id: string): Promise<Document> {
    const response = await apiClient.get<Document>(`/documents/${id}`);
    return response.data;
  }

  async uploadDocument(data: CreateDocumentRequest): Promise<Document> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('dealId', data.dealId);
    formData.append('file', data.file);

    const response = await apiClient.post<Document>('/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async deleteDocument(id: string): Promise<void> {
    await apiClient.delete(`/documents/${id}`);
  }

  async listDocuments(dealId: string): Promise<Document[]> {
    const response = await apiClient.get<Document[]>('/documents', {
      params: { dealId },
    });
    return response.data;
  }
}

export const documentsService = new DocumentsService();
