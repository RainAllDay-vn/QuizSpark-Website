# QuizSpark 🧠✨

> **An AI-Powered Adaptive Learning & Assessment Platform - Frontend**

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1-purple?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwindcss)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue?logo=docker)

## 🚀 Overview

**QuizSpark** is an intelligent educational platform designed to streamline the assessment process for teachers and personalize learning for students. By leveraging **Artificial Intelligence**, QuizSpark transforms static study materials into interactive quizzes, provides real-time feedback, and adapts to each learner's unique pace.

This repository contains the **frontend application** of QuizSpark, built as a modern, responsive Single Page Application (SPA) that communicates with a RESTful backend API.

## 💡 Key Features

### 🤖 AI-Driven Capabilities
- **Smart Question Generation**: Automatically extracts concepts from uploaded **PDFs** and **Markdown** files to generate relevant questions (Multiple Choice, Fill-in-the-Blank, etc.).
- **Adaptive Learning**: The system analyzes user performance history to recommend questions that target specific knowledge gaps.
- **Context-Aware Chatbot**: An integrated AI assistant that "reads" your open documents to answer questions and provide explanations in real-time.

### 📚 Comprehensive Workspace
- **Advanced File Management**: Organize study materials with a hierarchical system (parent-child file relationships).
- **Split-Screen Learning**: View PDFs/Notes on one side while practicing questions or chatting with AI on the other.
- **Rich Media Support**: Built-in viewers for PDFs, Images, and a live Markdown editor.

### 🏫 Collaboration & Assessment
- **Virtual Classrooms**: Teachers can manage classes, assign question banks, and monitor student progress.
- **Real-Time Leaderboards**: Gamified learning experience to motivate students.
- **Detailed Analytics**: Performance charts showing strengths, weaknesses, and progress over time.

## 🛠️ Technology Stack

This frontend application is built using modern, industry-standard technologies.

### **Core Framework**
- **React 18**: Component-based UI library for building interactive user interfaces
- **TypeScript 5.0**: Type-safe JavaScript for enhanced developer experience and code reliability
- **Vite 7.1**: Lightning-fast build tool and development server with HMR

### **UI/UX & Styling**
- **Tailwind CSS 4.1**: Utility-first CSS framework for rapid, consistent UI development
- **Shadcn UI (Radix Primitives)**: Accessible, unstyled UI components for complex interactions
- **Lucide React**: Beautiful, consistent icon library

### **State Management & Architecture**
- **React Context API**: Global state management for Workspace and ChatBot features
- **Custom Hooks**: Reusable stateful logic (useWorkspace, useChatBot, use_auth_hook)
- **Reducer Pattern**: Complex state transitions for workspace management

### **Key Libraries & Integrations**
- **React Router DOM**: Client-side routing for seamless navigation
- **Axios**: Promise-based HTTP client for API communication
- **Firebase SDK**: Authentication integration (Google OAuth)
- **React PDF**: Custom PDF rendering and viewing
- **React DnD**: Drag-and-drop functionality for file management
- **React Markdown & KaTeX**: Markdown rendering with mathematical formula support
- **CodeMirror**: Live markdown editor with syntax highlighting

### **Development & Deployment**
- **Docker**: Containerization for consistent deployment
- **Nginx**: Production web server for serving static assets
- **ESLint**: Code quality and linting

## 🏗️ Frontend Architecture

The QuizSpark frontend follows a **modular component architecture** designed for scalability and maintainability:

### **Application Structure**
- **Single Page Application (SPA)**: React-based SPA with client-side routing for smooth navigation
- **Component-Based Architecture**: Reusable UI components organized by feature and functionality
- **Context-Based State Management**: Global state for Workspace and ChatBot features

### **Key Architectural Patterns**
- **Provider Pattern**: ThemeProvider, ChatBotProvider, WorkspaceProvider wrap the application
- **Compound Component Pattern**: WorkspaceSidebar + WorkspaceTabs + File Viewers work together
- **Render Props / Callback Pattern**: AI streaming uses callbacks for progressive updates
- **Reducer Pattern**: WorkspaceContext uses reducer for complex state transitions

### **Module Organization**
```
src/
├── components/          # Reusable UI components
│   ├── chatbot/        # AI chatbot system
│   ├── custom/         # Custom application components
│   ├── ui/             # Shadcn UI primitives
│   └── workspace/      # Workspace file management
├── dtos/               # Data transfer objects
├── lib/                # Utilities and API client
├── model/              # TypeScript interfaces
└── pages/              # Page-level components
```

## 🐳 Getting Started

This frontend application can be run locally or deployed using Docker.

### Prerequisites
- Node.js 22+ and npm
- Docker (optional, for containerized deployment)

### Local Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/RainAllDay-vn/QuizSpark-Website.git
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables**
    Create a `.env` file in the root directory:
    ```env
    VITE_BACKEND_API=http://localhost:8080/api/v1
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Access the application**
    Open your browser to `http://localhost:5173`

### Docker Deployment

1.  **Build the Docker image**
    ```bash
    docker build -t quizspark-website .
    ```

2.  **Run the container**
    ```bash
    docker run -p 3000:3000 quizspark-website
    ```

3.  **Access the application**
    Open your browser to `http://localhost:3000`

## 👨‍💻 Author

**Long Vu**
