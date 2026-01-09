# System Architecture

## High-Level Overview
QuizSpark follows a client-server architecture. The frontend is a Single Page Application (SPA) built with React and Vite, served to users who interact with a backend API (assumed to be Java/Spring Boot based on DTO structures, though only frontend code is available here) and Firebase services.

## Component Architecture

### Frontend Layer
-   **Framework**: React 19 with TypeScript.
-   **Build Tool**: Vite.
-   **Routing**: React Router DOM v7 handling client-side navigation.
    -   `App.tsx` defines the route hierarchy, including public, anonymous, and protected routes (using `ProtectedRoute` and `RoleProtectedRoute wrappers`).
-   **State Management**:
    -   **Context API**: Used for global state that needs to be accessed across many components.
        -   `ChatBotContext`: Manages chat sessions, tools, and workflows.
        -   `WorkspaceContext`: Manages open files, panes, and layout state in the workspace.
        -   `ThemeProvider`: Manages UI polling/theming.
    -   **Local State**: `useState` and `useReducer` for component-specific logic.
    -   **Custom Hooks**: `useAuthStatus` for authentication state.

### Data Layer
-   **API Client**: Axios instance configured in `src/lib/api.ts` with interceptors to inject Firebase Auth tokens.
-   **DTOs**: TypeScript interfaces in `src/dtos/` mirror backend data structures, ensuring type safety for API responses and requests.
-   **Models**: Domain entities in `src/model/` (e.g., `Question`, `QuestionBank`, `Practice`) representing the core business objects.

### Services & External Integrations
-   **Firebase Auth**: Handles user identification and session management.
-   **Backend API**: accessible via `src/lib/api.ts`, providing endpoints for:
    -   User management (`/users`)
    -   Question Banks (`/banks`)
    -   Questions (`/questions`)
    -   Practice Sessions (`/practice`)
    -   AI & Chat (`/ai`, `/chat`)
    -   File Management (`/files`)
    -   Classrooms (`/classrooms`)

## Key Workflows

### Authentication
1.  User signs in via `AccessPage` (Firebase).
2.  `useAuthStatus` hook detects state change.
3.  `api.ts` interceptor attaches the ID token to subsequent requests.
4.  Backend validates token and returns user profile/role.

### Practice Session
1.  User initiates practice from `QuestionBankPage`.
2.  `startNewPractice` API creates a session.
3.  `PracticePage` loads session data.
4.  User submits answers; `answer` API verifies and updates local state.
5.  Session concludes with a summary view.

### AI Chatbot
1.  **Global vs. Contextual**: `GlobalChatBot` is always available; specific pages can register contexts via `ChatBotContext`.
2.  **Streaming**: `streamChat` uses Server-Sent Events (SSE) to receive AI responses chunk-by-chunk for a responsive UI.
3.  **Tools**: The chatbot can be extended with client-side tools (e.g., "get_current_time") registered via the context.

### Workspace
1.  **Layout**: `WorkspacePage` uses `react-resizable-panels` for a split-view experience.
2.  **State**: `WorkspaceContext` tracks which files are open in which pane.
3.  **Drag-and-Drop**: `react-dnd` allows moving tabs between panes.
4.  **Editing**: `LiveMarkdownEditor` allows real-time editing of markdown files, autosaving to the backend.

## Directory Structure
-   `src/components`: Reusable UI components (shadcn/ui), custom business components (`chatbot`, `workspace`, `custom`).
-   `src/pages`: Top-level page components corresponding to routes (`home_page`, `practice_page`, etc.).
-   `src/lib`: Utility functions and API configurations.
-   `src/dtos`: Data Transfer Objects for API communication.
-   `src/model`: Core domain models.