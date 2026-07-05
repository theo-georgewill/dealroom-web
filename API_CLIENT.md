# API Client Guide

## Overview

The frontend uses a centralized API client based on Axios that handles all communication with the NestJS backend.

## Configuration

### Environment Variable

Set the API base URL in your environment:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api  # Development
NEXT_PUBLIC_API_URL=https://api.dealroom.com/api  # Production
```

## API Client Features

### Automatic Authorization

The API client automatically includes the JWT token from localStorage in all requests:

```typescript
Authorization: Bearer {token}
```

### Request/Response Interceptors

- Requests: Automatically adds Authorization header
- Responses: Handles 401 errors by clearing auth and redirecting to login

### Usage

```typescript
import { apiClient } from '@/lib/api-client';

// GET request
const response = await apiClient.get<User>('/users/me');

// POST request
const response = await apiClient.post<Deal>('/deals', dealData);

// PUT request with patch
const response = await apiClient.patch<Deal>('/deals/123', updateData);

// DELETE request
await apiClient.delete('/deals/123');
```

## Service Layer

Services provide domain-specific API methods. All services are located in `lib/services/`:

```typescript
import { authService, dealsService, usersService } from '@/lib/services';

// Auth
await authService.login(credentials);
await authService.register(userData);
await authService.getCurrentUser();

// Deals
await dealsService.createDeal(dealData);
const deals = await dealsService.listDeals(page, limit, status);

// Users
const user = await usersService.getUser(userId);
```

## Error Handling

Use the error handler utility for consistent error management:

```typescript
import { getErrorMessage, isAuthError, isValidationError } from '@/lib/error-handler';

try {
  await authService.login(credentials);
} catch (error) {
  const message = getErrorMessage(error);
  
  if (isAuthError(error)) {
    // Handle 401
  }
  
  if (isValidationError(error)) {
    // Handle validation errors
  }
}
```

## Adding New Service Methods

1. Create a new service file in `lib/services/[domain].service.ts`
2. Define request/response types
3. Implement methods using apiClient
4. Export from `lib/services/index.ts`

```typescript
// lib/services/custom.service.ts
import { apiClient } from '@/lib/api-client';

class CustomService {
  async getData(): Promise<CustomData> {
    const response = await apiClient.get<CustomData>('/custom');
    return response.data;
  }
}

export const customService = new CustomService();
```
