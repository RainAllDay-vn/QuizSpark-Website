# Implementation Plan: Workspace Page

This document outlines the architecture and implementation roadmap for the QuizSpark Workspace Page, designed for advanced file viewing, split-screen workflows, and Markdown editing.

## 1. Architectural Overview

### Core UI Structure
- **Global Sidebar**: Standard application navigation.
- **Workspace Sidebar**: Specialized file selection, search, filtering, and upload (collapsible).
- **Tab Bar**: Browser-like tab interface for managing multiple open files per pane.
- **Split Panes**: Horizontal split allowing two files to be viewed side-by-side using `react-resizable-panels`.

### Technology Stack
- **Layout**: `react-resizable-panels` for resizable splits.
- **State Management**: `WorkspaceContext` (Reducer-based) for managing tab lists, active tabs, and layout modes.
- **Drag-and-Drop**: `react-dnd` for moving files from sidebar to workspace and reordering tabs.
- **PDF Viewing**: `react-pdf` for page-mode navigation and interactive controls.
- **Markdown**: Vanilla React state with a controlled textarea/viewer.

## 2. Component Structure

```text
src/
├── pages/
│   └── workspace_page/
│       └── workspace_page.tsx       # Main container & Layout
├── components/
│   └── workspace/
│       ├── WorkspaceContext.tsx      # State & Provider
│       ├── WorkspaceSidebar.tsx      # File Navigator
│       ├── WorkspaceTabs.tsx         # Tab UI
│       ├── FileViewer.tsx            # (Stage 3) Dynamic Viewer
│       └── DropZone.tsx              # (Stage 2) DnD Targets
```

## 3. Implementation Roadmap

### [x] Stage 1: Core Foundation
- [x] Create `WorkspacePage` standalone route.
- [x] Implement `WorkspaceSidebar` with real API integration.
- [x] Support file upload (PDF/MD) and basic filtering.
- [x] Responsive collapsible behavior.

### [/] Stage 2: Tab System & Interaction
- [x] **2A: Tab Management**: Implement Reducer for opening/closing/focusing tabs.
- [ ] **2B: Split Screen**: Logic for toggling 'single' vs 'split' layout.
- [ ] **2C: Drag-and-Drop**: 
    - Sidebar -> Pane (Open file).
    - Tab -> Other Pane (Move file).
    - Tab reordering.

### [ ] Stage 3: File Viewers
- [ ] **PDF Viewer**: 
    - Page-mode navigation (Arrow keys).
    - Zoom and Search basics.
- [ ] **Markdown Editor**:
    - Side-by-side edit/preview or toggle mode.
    - Basic syntax highlighting.

### [ ] Stage 4: Polishing
- [ ] Visual "Drop Zone" indicators.
- [ ] Middle-click to open in split.
- [ ] Persist workspace state (optional/stretch).

## 4. State Shape (WorkspaceContext)

```typescript
interface Tab {
    id: string; // Unique instance ID
    file: DbFile;
}

interface WorkspaceState {
    layout: 'single' | 'split';
    panes: {
        left: Tab[];
        right: Tab[];
    };
    activeTab: {
        left: string | null;
        right: string | null;
    };
    activePane: 'left' | 'right';
}
```

## 5. Verification Plan
- **Performance**: Ensure switching between complex PDFs is smooth.
- **Usability**: Verify that dragging files feels intuitive and drop zones are clear.
- **Split Logic**: Ensure closing the last tab in a split correctly focuses the remaining pane.
