# Product Context

## Problem to Solve
Education platforms often lack a cohesive integration between question management, student practice, and intelligent assistance. Teachers struggle with organizing content and tracking progress, while students may not get immediate feedback or personalized help during their learning journey. Existing solutions often fragment these needs into separate tools, leading to a disjointed experience.

## Solution Features
QuizSpark resolves these issues by providing a unified platform with the following key features:

1.  **Comprehensive Question Bank**:
    -   Support for multiple question types (Single Choice, Multiple Choice, Fill in the Blank, Open Answer).
    -   Tag-based organization for easy retrieval.
    -   Ability to attach files and images to questions.
    -   Bulk import/export capabilities (inferred from API endpoints like `overwriteAllQuestions`).

2.  **Flexible Practice Mode**:
    -   Anonymous practice for quick sessions.
    -   Authenticated practice for progress tracking.
    -   Customizable sessions: set number of questions, shuffle options, and toggle answer reveal.
    -   Immediate feedback on answers.
    -   Summary view after completion.

3.  **Classroom Management**:
    -   Teachers can create classrooms and invite students via codes or usernames.
    -   Role-based access ensures teachers manage content while students participate.
    -   Tracking of student performance and engagement.

4.  **Integrated AI Assistant**:
    -   **Context-Aware Chatbot**: Accessible globally and within specific contexts (e.g., while viewing a PDF).
    -   **File Parsing**: AI can parse uploaded files to generate summaries or answer questions based on the content.
    -   **Adaptive Question Generation**: AI can convert content from banks into adaptive practice sessions.
    -   **Streaming Responses**: Real-time interaction for a fluid user experience.

5.  **Interactive Workspace**:
    -   Split-pane view for multitasking (e.g., viewing a PDF while taking notes).
    -   Live Markdown editor with auto-saving and word count.
    -   PDF viewer with integration into the AI context.
    -   Drag-and-drop interface for managing tabs and panes.

6.  **Gamification & Engagement**:
    -   Leaderboards to foster friendly competition.
    -   User statistics to track personal progress (total attempts, correct answers).

## User Experience Goals
-   **Intuitive Interface**: A dark-themed, modern UI using Tailwind CSS and Radix UI for accessibility and responsiveness.
-   **Seamless Workflow**: Smooth transitions between learning, practicing, and managing content.
-   **Immediate Assistance**: AI tools are always at hand to clarify doubts or help generate content.
-   **Performance**: Fast load times and real-time updates using efficient state management and SSE.