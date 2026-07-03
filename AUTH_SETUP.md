# Authentication Setup Guide

This guide explains the authentication system implemented in DealRoom and how to configure it.

## Overview

The authentication flow includes:
- Sign In (`/auth/signin`)
- Sign Up (`/auth/signup`)
- Forgot Password (`/auth/forgot-password`)
- Reset Password (`/auth/reset-password`)

## Architecture

### Core Components

1. **Auth Service** (`lib/services/auth.service.ts`)
   - Handles all API communication with the backend
   - Manages token and user data storage
   - Provides methods for login, register, forgot password, and reset password

2. **Auth Context** (`lib/context/auth-context.tsx`)
   - Manages authentication state globally
   - Provides `useAuth()` hook for accessing auth data and methods
   - Automatically initializes from localStorage on app load

3. **Auth Pages**
   - `/auth/signin` - Sign in with email and password
   - `/auth/signup` - Create a new account
   - `/auth/forgot-password` - Request password reset email
   - `/auth/reset-password` - Reset password with token

4. **Protected Routes**
   - `components/auth/protected-route.tsx` - Wrapper component for protected pages
   - `middleware.ts` - Server-side route protection and redirects

## Environment Variables

Set `NEXT_PUBLIC_API_URL` to point to your backend API:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

In production, update this to your production API URL.

## Backend API Requirements

Your backend must implement these endpoints:

### POST /auth/login
Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe"
  },
  "token": "jwt_token_here"
}
```

### POST /auth/register
Request:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

Response:
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe"
  },
  "token": "jwt_token_here"
}
```

### POST /auth/forgot-password
Request:
```json
{
  "email": "user@example.com"
}
```

Response:
```json
{
  "message": "Password reset email sent"
}
```

### POST /auth/reset-password
Request:
```json
{
  "token": "reset_token_from_email",
  "password": "newpassword123"
}
```

Response:
```json
{
  "message": "Password reset successful"
}
```

## Usage

### In Components

Access authentication state and methods using the `useAuth()` hook:

```tsx
'use client';

import { useAuth } from '@/lib/context/auth-context';

export function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>Please sign in</p>;
  }

  return (
    <div>
      <p>Welcome, {user?.fullName}</p>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
```

### Protecting Routes

Wrap protected pages with the `ProtectedRoute` component:

```tsx
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Dashboard Content</div>
    </ProtectedRoute>
  );
}
```

Alternatively, use the middleware for automatic redirects (already configured).

## Token Storage

Tokens are stored in localStorage and are automatically sent to the API via the Authorization header. The system reads from localStorage on app initialization to restore the user session.

For production, consider:
- Using httpOnly cookies instead of localStorage
- Implementing token refresh logic
- Adding CSRF protection

## Error Handling

All auth pages include error handling with user-friendly messages. Errors from the API are displayed in alert boxes.

Common error scenarios:
- Invalid credentials during login
- Email already exists during signup
- Invalid or expired reset tokens
- Network errors

## Styling

All auth pages follow the existing DealRoom design system:
- Colors from design tokens (primary, foreground, muted, etc.)
- Typography and spacing matching existing components
- Input and button styling consistent with the app
- Responsive layout for mobile and desktop

## Security Considerations

1. **Passwords**: Never logged or stored in plain text
2. **Tokens**: Store securely (consider httpOnly cookies for production)
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: Configure backend CORS to only allow your frontend domain
5. **Validation**: Both client-side and server-side validation required

## Testing the Flow

1. Navigate to `/auth/signin`
2. Click "Sign up here" to create an account
3. Enter email, full name, and password
4. After signup, you'll be redirected to `/dashboard`
5. To test forgot password, click the link on signin page
6. The reset password link follows the format: `/auth/reset-password?token=<token>`

## Next Steps

1. Set the `NEXT_PUBLIC_API_URL` environment variable
2. Implement the required backend endpoints
3. Test the authentication flow end-to-end
4. Consider implementing token refresh and secure storage
5. Set up email service for password reset emails
