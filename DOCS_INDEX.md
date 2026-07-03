# DealRoom Frontend Documentation Index

Complete guide to the production-ready frontend architecture.

## 📚 Documentation Files

### Getting Started
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Start here!
  - Installation instructions
  - Environment configuration
  - Quick start examples
  - Troubleshooting guide

### Architecture
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design overview
  - Directory structure
  - Component organization
  - File organization
  - Separation of concerns

- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - What was built
  - Complete component list
  - All files created
  - Architecture highlights
  - Next steps for integration

### API Integration
- **[API_CLIENT.md](./API_CLIENT.md)** - HTTP client guide
  - Configuration
  - Request/response handling
  - Error handling
  - Service layer overview
  - Adding new endpoints

### Authentication
- **[AUTHENTICATION.md](./AUTHENTICATION.md)** - Auth implementation
  - Setup instructions
  - Using useAuth hook
  - Token management
  - Form validation
  - Backend requirements

## 🗂️ Key Files by Purpose

### API & HTTP
- `lib/api-client.ts` - Axios configuration and interceptors
- `lib/error-handler.ts` - Error utilities
- `lib/services/` - Domain-specific API services

### Authentication
- `lib/context/auth-context.tsx` - Global auth state
- `lib/services/auth.service.ts` - Auth API methods
- `hooks/use-auth.ts` - Auth hook
- `lib/validations/auth.ts` - Zod schemas
- `middleware.ts` - Route protection

### Data Management
- `lib/query-client.ts` - TanStack Query config
- `providers/query-provider.tsx` - Query provider

### Types & Validation
- `lib/types/` - TypeScript definitions
- `lib/validations/` - Zod schemas
- `lib/error-handler.ts` - Error types and utilities

### UI Components
- `components/ui/` - Reusable components
  - Loading states
  - Error handling
  - Empty states
  - Notifications

### Hooks
- `hooks/use-auth.ts` - Authentication hook
- `hooks/use-async.ts` - Async state management

## 🔍 Quick References

### Common Tasks

#### Login User
```typescript
import { useAuth } from '@/hooks';

const { login } = useAuth();
await login({ email: 'user@example.com', password: 'pwd' });
```

#### Fetch Data from API
```typescript
import { dealsService } from '@/lib/services';

const deals = await dealsService.listDeals(1, 10);
```

#### Handle Errors
```typescript
import { getErrorMessage, isAuthError } from '@/lib/error-handler';

try {
  // API call
} catch (error) {
  const msg = getErrorMessage(error);
  if (isAuthError(error)) { /* handle 401 */ }
}
```

#### Show Loading State
```typescript
import { PageLoader } from '@/components/ui/page-loader';

{isLoading && <PageLoader />}
```

#### Form with Validation
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validations/auth';

const form = useForm({ resolver: zodResolver(loginSchema) });
```

## 📋 Implementation Checklist

- ✅ API client with Axios
- ✅ Authentication service
- ✅ Auth context provider
- ✅ Custom hooks (useAuth, useAsync)
- ✅ Service layer (7 services)
- ✅ Route middleware protection
- ✅ Form validation with Zod
- ✅ Error handling utilities
- ✅ UI components
- ✅ TanStack Query setup
- ✅ TypeScript types
- ✅ Comprehensive documentation

## 🚀 Getting Started Steps

1. **Read SETUP_GUIDE.md**
   - Install dependencies
   - Configure environment
   - Start dev server

2. **Review ARCHITECTURE.md**
   - Understand directory structure
   - Learn about separation of concerns

3. **Check AUTHENTICATION.md**
   - Understand auth flow
   - Learn how to use useAuth hook

4. **Check API_CLIENT.md**
   - Learn how to use services
   - Understand error handling

5. **Implement backend endpoints**
   - See AUTHENTICATION.md for required endpoints
   - Update service methods as needed

6. **Test authentication**
   - Login at `/auth/signin`
   - Verify protected routes work
   - Check token refresh flow

## 💡 Best Practices

### Using Services
Always use services for API calls, never call the API client directly in components:

```typescript
// ✅ Good
import { dealsService } from '@/lib/services';
const deal = await dealsService.getDeal(id);

// ❌ Avoid
const deal = await apiClient.get(`/deals/${id}`);
```

### Error Handling
Use error utilities for consistent handling:

```typescript
// ✅ Good
import { getErrorMessage } from '@/lib/error-handler';
const msg = getErrorMessage(error);

// ❌ Avoid
const msg = error.response?.data?.message || 'Error';
```

### Form Validation
Use Zod schemas for all forms:

```typescript
// ✅ Good
import { loginSchema } from '@/lib/validations/auth';
const form = useForm({ resolver: zodResolver(loginSchema) });

// ❌ Avoid
// Manual validation logic in components
```

### Component Organization
Keep business logic out of components:

```typescript
// ✅ Good - Business logic in service
const deal = await dealsService.createDeal(data);

// ❌ Avoid - API logic in component
const response = await fetch('/api/deals', { method: 'POST' });
```

## 🔧 Configuration Files

### Environment Variables
- `.env.local` - Development environment
- `.env.production` - Production environment

Required:
- `NEXT_PUBLIC_API_URL` - Backend API URL

### TypeScript
- `tsconfig.json` - TypeScript configuration (strict mode)

### Next.js
- `next.config.js` - Next.js configuration
- `middleware.ts` - Route protection middleware

### Tailwind CSS
- `tailwind.config.js` - Tailwind configuration
- `globals.css` - Global styles

## 📞 Getting Help

### Documentation Reference
- Check DOCS_INDEX.md (this file)
- Read specific documentation for your task
- Review code examples in documentation

### Code Reference
- Check `lib/services/` for API examples
- Review `lib/types/` for type definitions
- Look at `lib/validations/` for form schemas

### Debugging
- Check browser console for errors
- Verify `NEXT_PUBLIC_API_URL` configuration
- Check middleware.ts for route issues
- Review error-handler.ts utilities

## 🎯 Common Scenarios

### Scenario: Add a new API endpoint

1. Create service method in appropriate file
2. Add types for request/response
3. Export from `lib/services/index.ts`
4. Use in component with proper error handling

See [API_CLIENT.md](./API_CLIENT.md) for detailed example.

### Scenario: Protect a new route

1. Add route to `protectedRoutes` array in `middleware.ts`
2. Ensure page is under appropriate directory
3. Unauthenticated users will be redirected to login

See [AUTHENTICATION.md](./AUTHENTICATION.md) for details.

### Scenario: Add form validation

1. Create Zod schema in `lib/validations/`
2. Use with React Hook Form and zodResolver
3. Add error handling and display

See [AUTHENTICATION.md](./AUTHENTICATION.md) for examples.

### Scenario: Handle API errors

1. Use error utility functions
2. Check error type (auth, validation, network)
3. Display appropriate message to user

See [API_CLIENT.md](./API_CLIENT.md) for error handling guide.

---

**Version**: 1.0
**Last Updated**: 2024
**Status**: Production Ready
**Maintainability**: High
**Documentation**: Comprehensive
