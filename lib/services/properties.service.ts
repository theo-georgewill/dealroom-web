import { apiClient } from '@/lib/api-client';
import { AxiosRequestConfig } from 'axios';

interface ApiResponse<T, M = undefined> {
  success: boolean;
  message: string;
  data: T;
  meta?: M;
}

export type PropertyStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'ARCHIVED';

export type PropertyType =
  | 'RESIDENTIAL'
  | 'COMMERCIAL'
  | 'INDUSTRIAL'
  | 'LAND'
  | 'MIXED_USE';

export interface PropertyImage {
  id: string;
  propertyId: string;
  storageFileId: string;
  isCover: boolean;
  storageFile: {
    id: string;
    originalName: string;
    mimeType: string;
    size: number;
    bucket: string;
    key: string;
    uploadedById: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  ownerId: string;
  name: string;
  type: PropertyType;
  address: string;
  city: string;
  state: string;
  country: string;
  description?: string | null;
  status: PropertyStatus;
  images: PropertyImage[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyRequest {
  name: string;
  type: PropertyType;
  address: string;
  city: string;
  state: string;
  country: string;
  description?: string;
}

export interface UpdatePropertyRequest {
  name?: string;
  type?: PropertyType;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  description?: string;
  status?: PropertyStatus;
}

export interface ListPropertiesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedPropertiesResponse {
  data: Property[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface CreatePropertyUploadUrlRequest {
  filename: string;
  mimeType: string;
}

export interface CreatePropertyUploadUrlResponse {
  uploadUrl: string;
  key: string;
  expiresIn: number;
}

export interface CompletePropertyUploadRequest {
  key: string;
  originalName: string;
  mimeType: string;
  size: number;
  isCover?: boolean;
}

class PropertiesService {
  async createProperty(
    data: CreatePropertyRequest,
  ): Promise<Property> {
    const response = await apiClient.post<
      ApiResponse<Property>
    >('/properties', data);

    return response.data.data;
  }

  async getProperty(
    id: string,
    config?: AxiosRequestConfig,
  ): Promise<Property> {
    const response = await apiClient.get<
      ApiResponse<Property>
    >(`/properties/${id}`, config);

    return response.data.data;
  }

  async listProperties(
    params: ListPropertiesParams = {},
    config?: AxiosRequestConfig,
  ): Promise<PaginatedPropertiesResponse> {
    const response = await apiClient.get<
      ApiResponse<Property[], PaginatedPropertiesResponse['meta']>
    >('/properties', {
      params,
      ...config,
    });

    return {
      data: response.data.data,
      meta: response.data.meta!,
    };
  }

  async updateProperty(
    id: string,
    data: UpdatePropertyRequest,
  ): Promise<Property> {
    const response = await apiClient.patch<
      ApiResponse<Property>
    >(`/properties/${id}`, data);

    return response.data.data;
  }

  async deleteProperty(
    id: string,
  ): Promise<void> {
    await apiClient.delete(`/properties/${id}`);
  }

  async createUploadUrl(
    propertyId: string,
    data: CreatePropertyUploadUrlRequest,
  ): Promise<CreatePropertyUploadUrlResponse> {
    const response = await apiClient.post<
      ApiResponse<CreatePropertyUploadUrlResponse>
    >(
      `/properties/${propertyId}/images/upload-url`,
      data,
    );

    return response.data.data;
  }

  async completeUpload(
    propertyId: string,
    data: CompletePropertyUploadRequest,
  ): Promise<PropertyImage> {
    const response = await apiClient.post<
      ApiResponse<PropertyImage>
    >(
      `/properties/${propertyId}/images/complete-upload`,
      data,
    );

    return response.data.data;
  }

  async deleteImage(
    propertyId: string,
    imageId: string,
  ): Promise<void> {
    await apiClient.delete(
      `/properties/${propertyId}/images/${imageId}`,
    );
  }
}

export const propertiesService =
  new PropertiesService();
