# Authentication Implementation Guide

## Overview

The authentication flow has been successfully connected to your NestJS backend. The login form now sends real API requests to your authentication endpoint while handling errors gracefully.

## Architecture

### Components

1. **API Client** (`lib/api-client.ts`)
   - Centralized Axios instance with automatic JWT injection
   - Request/response interceptors for error handling
   - Reads `NEXT_PUBLIC_API_URL` environment variable

2. **Auth Service** (`lib/services/auth.service.ts`)
   - Handles all authentication API calls
   - Stores/retrieves tokens and user data from localStorage
   - Methods: `login()`, `register()`, `logout()`, `refreshToken()`, etc.

3. **Auth Context** (`lib/context/auth-context.tsx`)
   - Global state management for authentication
   - Provides `useAuth()` hook for components
   - Handles loading states and error propagation

4. **Login Page** (`app/auth/signin/page.tsx`)
   - Sign-in form with email/password inputs
   - Loading states during submission
   - Error display with user-friendly messages
   - Redirects to dashboard on success

## Login Flow

### 1. User Submits Form

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsSubmitting(true);

  try {
    // Pass credentials as LoginRequest object
    await login({ email, password });
    router.push('/dashboard');
  } catch (err: any) {
    // Display error message from backend
    const errorMessage = err?.response?.data?.message || 
                        err?.message || 
                        'Failed to sign in. Please check your credentials and try again.';
    setError(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};
```

### 2. Auth Context Calls Service

```typescript
const login = async (credentials: LoginRequest) => {
  setIsLoading(true);
  try {
    const response = await authService.login(credentials);
    authService.setStoredUser(response.user);
    setUser(response.user);
  } catch (error) {
    setIsLoading(false);
    throw error; // Propagate to component
  }
  setIsLoading(false);
};
```

### 3. Service Makes API Request

```typescript
async login(credentials: LoginRequest): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  if (response.data.token) {
    apiClient.setAuthToken(response.data.token);
  }
  return response.data;
}
```

### 4. API Client Adds Authentication

- Automatically adds `Authorization: Bearer {token}` header to all requests
- Handles 401 responses by clearing auth and redirecting to login
- Retries requests with refreshed tokens if available

### 5. Success Response

- JWT token stored in localStorage (key: `authToken`)
- User object stored in localStorage (key: `currentUser`)
- User state updated in auth context
- Component redirects to `/dashboard`

## Environment Configuration

### Development

Set the backend URL in `.env.development.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

The API client will use this to construct requests like:
```
POST http://localhost:3001/api/auth/login
```

### Production

Update the environment variable in your deployment platform:

```bash
NEXT_PUBLIC_API_URL=https://your-production-api.com/api
```

## Error Handling

The login form handles various error scenarios:

### Network Error
```
"Network Error"
```
Shown when the backend is unreachable.

### Invalid Credentials
```
"Invalid email or password"
```
Returned from your backend when authentication fails.

### Server Error
```
"Internal server error"
```
Any backend error message from the API response.

The error is displayed in a prominent red alert box that's cleared when the user starts typing again.

## API Endpoint Requirements

Your NestJS backend should implement:

### POST /auth/login

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "avatar": "https://...",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

**Error Response (401):**
```json
{
  "message": "Invalid email or password"
}
```

## Features Implemented

✅ Real API integration (no mocked authentication)
✅ Secure JWT token storage in localStorage
✅ Automatic token injection in API headers
✅ 401 error detection and automatic redirect to login
✅ Loading states during API calls
✅ Disabled submit button during submission
✅ Network error handling
✅ User-friendly error messages
✅ Form validation (email & password required)
✅ Automatic redirect to dashboard on success
✅ TypeScript throughout
✅ Environment variable configuration

## Testing the Integration

1. **Start the frontend:**
   ```bash
   npm run dev
   ```

2. **Start your NestJS backend:**
   ```bash
   # In your backend directory
   npm start
   ```

3. **Navigate to login page:**
   ```
   http://localhost:3000/auth/signin
   ```

4. **Test with valid credentials:**
   - The form will submit to your backend
   - On success, you'll be redirected to `/dashboard`
   - Token will be stored automatically

5. **Test with invalid credentials:**
   - Error message from your backend will be displayed
   - Form remains on the page for retry

## Files Modified

- `app/auth/signin/page.tsx` - Updated login form to use LoginRequest object and better error handling
- `lib/context/auth-context.tsx` - Fixed error propagation in login method
- `.env.development.local` - Added `NEXT_PUBLIC_API_URL` environment variable

## Files Already in Place

- `lib/api-client.ts` - Axios client with automatic token injection
- `lib/services/auth.service.ts` - Authentication service with all methods
- `lib/types/auth.ts` - TypeScript interfaces for authentication
- `lib/context/auth-context.tsx` - Global auth state management
- `hooks/use-auth.ts` - Custom hook for accessing auth context
- `middleware.ts` - Route protection middleware

## Next Steps

1. **Verify your NestJS backend** is running on `http://localhost:3001`
2. **Test the login flow** with valid credentials
3. **Implement additional routes** in your backend as needed
4. **Update other pages** to use the `useAuth()` hook for protected content
5. **Deploy** with the production API URL environment variable

## Troubleshooting

### "Network Error" appears on every login attempt

**Cause:** Backend is not running or the `NEXT_PUBLIC_API_URL` is incorrect.

**Solution:**
- Verify backend is running: `curl http://localhost:3001/api/auth/login`
- Check `.env.development.local` has correct `NEXT_PUBLIC_API_URL`
- Restart dev server after changing environment variables

### Login succeeds but not redirected to dashboard

**Cause:** Dashboard page doesn't exist or middleware is blocking it.

**Solution:**
- Create the dashboard page at `app/(protected)/dashboard/page.tsx`
- Check middleware allows authenticated users to access `/dashboard`

### Token not being sent in API requests

**Cause:** Token not stored or auth header not being added.

**Solution:**
- Check localStorage has `authToken` after successful login
- Verify `apiClient.setAuthToken()` is called in auth service
- Check request interceptor in `lib/api-client.ts`

### CORS errors when calling backend

**Cause:** Backend not configured to accept requests from frontend domain.

**Solution:**
- Add frontend URL to CORS whitelist in NestJS backend
- In NestJS, update `main.ts`:
  ```typescript
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://yourdomain.com'],
    credentials: true,
  });
  await app.listen(3001);
  ```
