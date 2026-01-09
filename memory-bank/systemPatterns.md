# System Patterns

## Architecture Overview
- **Frontend**: React application built with TypeScript and Vite.
- **Styling**: Tailwind CSS with Radix UI components for accessibility and common UI patterns.
- **Backend/Services**: Integration with Firebase for authentication and likely other backend services.
- **State Management**: React Context API is heavily used (e.g., `ChatBotContext.tsx`, `WorkspaceContext.tsx`).

## Core Design Patterns
- **Component-Based Architecture**: Modular UI components organized by feature (chatbot, custom, ui, workspace).
- **Service Layer**: API calls are likely centralized in `src/lib/api.ts`.
- **DTOs (Data Transfer Objects)**: Explicitly defined in `src/dtos/` to manage data structures between frontend and backend.
- **Hook-Based Logic**: Usage of custom hooks for shared logic (e.g., `use_auth_hook.ts`).

## Coding Standards
- TypeScript for type safety.
- ESLint for code quality and consistency.
- Standard file naming: snake_case for many files, PascalCase for components.
- Directory structure organized by feature and responsibility.
