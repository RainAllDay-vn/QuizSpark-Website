# Technical Stack

## Frontend
-   **Core Framework**: React 19 (Hooks, Context API).
-   **Language**: TypeScript (strict mode enabled).
-   **Build System**: Vite (Fast HMR, optimized builds).
-   **Styling**:
    -   Tailwind CSS v4 (Alpha) for utility classes.
    -   `tw-animate-css` for animations.
    -   `clsx` and `tailwind-merge` for conditional class combinations.
-   **Routing**: React Router DOM v7 (Loader functions, nested routes).
-   **State Management**:
    -   React Context for global state (Theme, Auth, Chat, Workspace).
    -   Local state for component-level logic.

## UI Components & Libraries
-   **Component Library**: Shadcn/UI (based on Radix UI).
-   **Icons**: Lucide React, FontAwesome Free.
-   **Markdown**:
    -   `react-markdown`, `remark-gfm`, `remark-math`, `rehype-katex` for rendering.
    -   `@uiw/react-codemirror` for editing.
-   **PDF Handling**: `react-pdf`.
-   **Drag & Drop**: `react-dnd` (HTML5 backend).
-   **Layout**: `react-resizable-panels`.

## Data & Networking
-   **HTTP Client**: Axios (Interceptors for auth, standard error handling).
-   **Authentication**: Firebase SDK v10 (Identity Platform).
-   **Real-time Communication**: Server-Sent Events (SSE) for AI streaming.

## Development Tools
-   **Linting**: ESLint (Flat config), React Hooks plugin.
-   **Formatting**: Prettier (implied).
-   **Package Manager**: npm/pnpm/yarn (based on lock file).

## Project Structure
-   Standard Vite + React structure.
-   Feature-based organization within `src/` (components, pages, lib, dtos).
-   DTOs used for strong typing of API responses.