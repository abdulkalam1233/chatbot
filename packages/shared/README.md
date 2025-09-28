# @repo/shared

Shared types, DTOs, utilities, and validation schemas for the chatbot application.

## Overview

This package provides a centralized location for all shared code between the web frontend and server backend, ensuring type safety and consistency across the entire application.

## Features

- **📦 DTOs**: Data Transfer Objects for API communication
- **🔧 Types**: Common TypeScript types and interfaces
- **📊 Constants**: Shared constants and enums  
- **🛠️ Utils**: Common utility functions
- **✅ Schemas**: Zod validation schemas with type inference

## Structure

```
src/
├── dtos/         # Data Transfer Objects
├── types/        # TypeScript types and interfaces
├── constants/    # Application constants
├── utils/        # Utility functions
├── schemas/      # Zod validation schemas
└── index.ts      # Main export file
```

## Usage

### Basic Import

```typescript
import { ChatDto, CreateChatDto, API_ENDPOINTS } from '@repo/shared';
```

### Specific Imports

```typescript
// DTOs only
import { ChatDto, UserDto } from '@repo/shared/dtos';

// Types only
import { ApiResponse, MessageRole } from '@repo/shared/types';

// Constants only
import { HTTP_STATUS, CHAT_LIMITS } from '@repo/shared/constants';

// Utils only
import { validateEmail, createSuccessResponse } from '@repo/shared/utils';

// Schemas only
import { ChatSchema, CreateUserSchema } from '@repo/shared/schemas';
```

## Examples

### Server-side (NestJS)

```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { 
  CreateChatDto, 
  ChatDto, 
  CreateChatSchema,
  createSuccessResponse 
} from '@repo/shared';

@Controller('chats')
export class ChatController {
  @Post()
  async createChat(@Body() dto: CreateChatDto) {
    // Validate with Zod
    const validatedData = CreateChatSchema.parse(dto);
    
    // Your business logic here...
    
    return createSuccessResponse(result);
  }
}
```

### Client-side (React)

```typescript
import { useState } from 'react';
import { ChatDto, CreateChatDto, CHAT_LIMITS } from '@repo/shared';

export const ChatForm = () => {
  const [chat, setChat] = useState<CreateChatDto>({
    title: '',
    userId: undefined
  });

  const handleSubmit = async () => {
    if (chat.title.length > CHAT_LIMITS.MAX_TITLE_LENGTH) {
      // Handle validation error
      return;
    }
    
    // Submit to API...
  };

  // Component JSX...
};
```

## Available Exports

### DTOs
- `ChatDto`, `CreateChatDto`, `UpdateChatDto`
- `ChatMessageDto`, `CreateChatMessageDto`
- `UserDto`, `CreateUserDto`, `UpdateUserDto`
- `LoginDto`, `AuthResponseDto`
- `ApiResponse<T>`, `PaginatedResponse<T>`

### Types
- `MessageRole`, `ChatStatus`, `UserRole`
- `ApiError`, `ValidationError`
- `ChatEvent`, `ChatMessageEvent`, etc.

### Constants
- `API_ENDPOINTS`, `HTTP_STATUS`
- `MESSAGE_ROLES`, `CHAT_LIMITS`
- `ERROR_CODES`, `REGEX_PATTERNS`

### Utils
- `validateEmail()`, `validateUUID()`, `validatePassword()`
- `createSuccessResponse()`, `createErrorResponse()`
- `generateId()`, `formatTimestamp()`
- `omit()`, `pick()`, `chunk()`, `unique()`

### Schemas
- All Zod schemas with TypeScript inference
- Runtime validation for DTOs
- Type-safe parsing and validation

## Development

```bash
# Build the package
pnpm build

# Watch mode for development
pnpm dev

# Type check
pnpm type-check

# Lint and format
pnpm lint
pnpm format
```

## Dependencies

- **zod**: Runtime validation and type inference
- **tsup**: Build tool for TypeScript packages
- **typescript**: TypeScript compiler