# DealRoom Frontend Architecture

This document outlines the production-ready frontend architecture for DealRoom, designed to connect with an existing NestJS backend.

## Directory Structure

```
app/                          # Next.js App Router pages
├── (protected)/              # Protected routes group (requires authentication)
├── auth/                     # Authentication pages
└── layout.tsx                # Root layout with providers

components/
├── ui/                       # Reusable UI components
├── layouts/                  # Layout components
├── auth/                     # Auth-related components
└── wizard/                   # Multi-step form components

hooks/                        # Custom React hooks
├── use-auth.ts               # Authentication context hook
├── use-async.ts              # Async state management hook
└── index.ts                  # Hook exports

lib/
├── api-client.ts             # Axios API client with interceptors
├── query-client.ts           # TanStack Query configuration
├── error-handler.ts          # Error handling utilities
├── validations/              # Zod validation schemas
│   └── auth.ts               # Auth form validations
├── services/                 # API service layer
│   ├── auth.service.ts       # Authentication endpoints
│   ├── users.service.ts      # User management
│   ├── deals.service.ts      # Deal operations
│   ├── documents.service.ts  # Document handling
│   ├── notifications.service.ts
│   ├── chat.service.ts       # Real-time messaging
│   ├── escrow.service.ts     # Escrow management
│   └── index.ts              # Service exports
├── context/                  # React Context providers
│   └── auth-context.tsx      # Authentication context
├── types/                    # TypeScript type definitions
│   ├── auth.ts               # Auth types
│   ├── index.ts              # All type exports
│   └── [domain].ts           # Domain-specific types
└── utils.ts                  # Utility functions

providers/                    # React Context Providers
├── query-provider.tsx        # TanStack Query provider
└── index.ts                  # Provider exports

middleware.ts                 # Next.js middleware for route protection
