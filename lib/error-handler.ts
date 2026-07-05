import { AxiosError } from 'axios';

export interface ApiErrorResponse {
  message: string;
  code?: string;
  statusCode?: number;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as any;
    return data?.message || error.message || 'An error occurred';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}

export function getErrorCode(error: unknown): string | undefined {
  if (error instanceof AxiosError) {
    const data = error.response?.data as any;
    return data?.code || error.code;
  }

  return undefined;
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof AxiosError && !error.response;
}

export function isAuthError(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 401;
}

export function isValidationError(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 400;
}

export function getValidationErrors(
  error: unknown
): Record<string, string> | undefined {
  if (error instanceof AxiosError && error.response?.status === 400) {
    const data = error.response.data as any;
    return data?.errors || data?.fieldErrors;
  }

  return undefined;
}
