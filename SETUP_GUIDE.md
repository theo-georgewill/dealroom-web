# DealRoom Frontend Setup Guide

## Prerequisites

- Node.js 18+ and npm/pnpm
- NestJS backend running and accessible
- Git

## Installation

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment

Create `.env.local` in the project root:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

For production:

```bash
NEXT_PUBLIC_API_URL=https://api.dealroom.com/api
```

### 3. Start Development Server

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## Architecture Overview

### Key Directories

```
lib/
├── api-client.ts           # HTTP client configuration
├── query-client.ts         # TanStack Query setup
├── error-handler.ts        # Error utilities
├── services/               # API service layer
├── context/                # React Context providers
├── types/                  # TypeScript definitions
└── validations/            # Zod schemas

components/
└── ui/                     # Reusable UI components

providers/                  # App providers (Query, Auth)
hooks/                      # Custom React hooks
middleware.ts              # Route protection
```

## Authentication Flow

### 1. Login Page (`/auth/signin`)

```typescript
import { useAuth } from '@/hooks';

function LoginPage() {
  const { login, isLoading } = useAuth();

  const handleLogin = async (credentials) => {
    await login(credentials);
    // Redirects to /dashboard on success
  };

  return <LoginForm onSubmit={handleLogin} />;
}
```

### 2. Protected Routes

All routes under `/dashboard`, `/deals`, etc. are automatically protected by middleware.

Unauthenticated users are redirected to `/auth/signin`.

### 3. User Context

Access authenticated user anywhere:

```typescript
import { useAuth } from '@/hooks';

function UserMenu() {
  const { user, logout } = useAuth();

  return (
    <div>
      <p>Logged in as: {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## API Integration

### Using Services

Services in `lib/services/` handle all API communication:

```typescript
import { dealsService } from '@/lib/services';

// Create a deal
const deal = await dealsService.createDeal({
  title: 'Property Sale',
  value: 500000,
});

// List deals
const { deals, total } = await dealsService.listDeals(1, 10);
```

### Error Handling

```typescript
import { getErrorMessage, isAuthError } from '@/lib/error-handler';

try {
  await dealsService.createDeal(dealData);
} catch (error) {
  const message = getErrorMessage(error);
  console.error(message);
  
  if (isAuthError(error)) {
    // Handle 401 - re-authenticate
  }
}
```

### Adding New API Endpoints

1. Create service method:

```typescript
// lib/services/custom.service.ts
async getData() {
  const response = await apiClient.get('/custom');
  return response.data;
}
```

2. Use in component with React Query (optional):

```typescript
import { useQuery } from '@tanstack/react-query';
import { customService } from '@/lib/services';

function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['custom'],
    queryFn: () => customService.getData(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{data}</div>;
}
```

## Form Handling

### Validation with Zod

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validations/auth';

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('email')} />
      {form.formState.errors.email && (
        <span>{form.formState.errors.email.message}</span>
      )}
    </form>
  );
}
```

## Components

### Loading State

```typescript
import { PageLoader } from '@/components/ui/page-loader';

<PageLoader />
```

### Error Display

```typescript
import { ErrorComponent } from '@/components/ui/error-component';

<ErrorComponent 
  message="Failed to load data"
  onRetry={() => refetch()}
/>
```

### Empty State

```typescript
import { EmptyState } from '@/components/ui/empty-state';
import { Plus } from 'lucide-react';

<EmptyState
  icon={Plus}
  title="No deals yet"
  description="Create your first deal to get started"
/>
```

## Testing

### Run Tests

```bash
pnpm test
```

### Build for Production

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

## Troubleshooting

### 401 Unauthorized

**Problem**: Getting 401 errors on protected routes

**Solution**: 
1. Check `NEXT_PUBLIC_API_URL` is correct
2. Verify backend is running
3. Ensure token is being sent in Authorization header

### CORS Errors

**Problem**: Cross-origin requests failing

**Solution**:
1. Ensure backend has CORS enabled
2. Check `NEXT_PUBLIC_API_URL` matches backend domain

### Routes Not Protected

**Problem**: Unauthenticated users accessing protected routes

**Solution**:
1. Verify `middleware.ts` is configured correctly
2. Check protected routes are defined in `protectedRoutes` array
3. Clear browser cookies and reload

## Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3001/api` |

## Additional Resources

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed architecture overview
- [API_CLIENT.md](./API_CLIENT.md) - API client usage guide
- [AUTHENTICATION.md](./AUTHENTICATION.md) - Auth implementation guide
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Implementation details

## Support

For issues or questions:

1. Check the documentation files
2. Review service implementations in `lib/services/`
3. Check middleware configuration in `middleware.ts`
4. Review error handling in `lib/error-handler.ts`

---

**Framework**: Next.js 16 with App Router
**Language**: TypeScript
**Styling**: Tailwind CSS
**Data Fetching**: TanStack Query + Axios
**Form Handling**: React Hook Form + Zod
**State Management**: React Context + Zustand
