# Authentication Guide

## Overview

The application uses JWT-based authentication with the NestJS backend. The frontend handles token management, user context, and protected routes.

## Setup

### 1. Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 2. Auth Provider

The `AuthProvider` wraps the entire application (in `app/layout.tsx`):

```tsx
import { AuthProvider } from '@/lib/context/auth-context';

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
```

## Using Authentication

### useAuth Hook

Access authentication state and methods anywhere in the app:

```typescript
import { useAuth } from '@/hooks';

function MyComponent() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated && <span>Hello, {user?.name}</span>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Login

```typescript
const { login } = useAuth();

await login({
  email: 'user@example.com',
  password: 'password123'
});
```

### Register

```typescript
const { register } = useAuth();

await register({
  email: 'user@example.com',
  name: 'John Doe',
  password: 'password123',
  confirmPassword: 'password123'
});
```

### Protected Routes

Use middleware (`middleware.ts`) for automatic route protection:

- Routes under `/dashboard`, `/deals`, etc. require authentication
- Unauthenticated users are redirected to `/auth/signin`
- Authenticated users accessing `/auth/*` are redirected to `/dashboard`

## Token Management

### Token Storage

Tokens are stored in localStorage:

```typescript
// Automatically handled by authService
localStorage.getItem('authToken');     // JWT token
localStorage.getItem('currentUser');   // User object
```

### Token Refresh

Implement refresh token logic in `authService.refreshToken()`:

```typescript
async refreshToken(refreshToken: string): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/refresh', {
    refreshToken,
  });
  if (response.data.token) {
    apiClient.setAuthToken(response.data.token);
  }
  return response.data;
}
```

## Form Validation

Use Zod schemas for form validation:

```typescript
import { loginSchema, registerSchema } from '@/lib/validations/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* form fields */}
    </form>
  );
}
```

## Error Handling

Handle auth-specific errors:

```typescript
import { isAuthError, getErrorMessage } from '@/lib/error-handler';

try {
  await login(credentials);
} catch (error) {
  const message = getErrorMessage(error);
  console.error(message);
  
  if (isAuthError(error)) {
    // Handle 401 - token expired
  }
}
```

## Backend Requirements

The backend must implement these endpoints:

- `POST /auth/login` - Login user
- `POST /auth/register` - Register new user
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user
- `POST /auth/refresh` - Refresh token
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token
