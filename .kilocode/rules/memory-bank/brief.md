# Project Brief

## Overview
QuizSpark is a comprehensive educational platform that combines question bank management, practice sessions, classroom organization, and AI-powered assistance. The frontend is built with React, TypeScript, and Vite, utilizing Firebase for authentication and a backend API for data persistence and AI features.

## Core Features
- **Question Banks**: Create, manage, and organize collections of questions (Single Choice, Multiple Choice, Fill in the Blank, Open Answer).
- **Practice Mode**: Students can practice questions from banks with customizable settings (size, shuffle, reveal answers).
- **Classrooms**: Teachers can organize students into classrooms, managing assignments and tracking progress.
- **AI Assistant**: A built-in chatbot and AI file parser to assist users with questions, content generation, and explanations.
- **Workspace**: A dedicated area for viewing files (PDFs, Markdown) and editing notes, integrated with the AI assistant.
- **Gamification**: Leaderboards and user statistics to encourage engagement.
- **Authentication**: Secure user login and registration using Firebase Auth, with role-based access control (Student, Teacher, Admin).

## Architecture
- **Frontend**: React + TypeScript + Vite.
- **Styling**: Tailwind CSS for utility-first styling.
- **State Management**: React Context API (ChatBotProvider, WorkspaceProvider) and local state.
- **Routing**: React Router DOM for navigation.
- **API Integration**: Axios for communicating with the backend API.
- **Real-time**: Server-Sent Events (SSE) for AI streaming responses.
- **UI Components**: Radix UI primitives and Lucide icons for a modern, accessible interface.

## Goals
- Provide a seamless and interactive learning experience.
- Empower teachers with tools to manage content and students effectively.
- Leverage AI to enhance learning and content creation processes.
- Maintain a clean, modular, and maintainable codebase.