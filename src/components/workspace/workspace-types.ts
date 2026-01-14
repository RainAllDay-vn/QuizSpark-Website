import type { DbFile } from '@/model/DbFile';

export interface Tab {
    id: string; // Unique tab ID
    file: DbFile;
    pdfPage?: number; // Track current PDF page
}

export type PaneId = 'left' | 'right';

export interface WorkspaceState {
    layout: 'single' | 'split';
    panes: {
        left: Tab[];
        right: Tab[];
    };
    activeTab: {
        left: string | null; // Tab ID
        right: string | null; // Tab ID
    };
    activePane: PaneId;
}

export type WorkspaceAction =
    | { type: 'OPEN_FILE'; file: DbFile; pane?: PaneId }
    | { type: 'CLOSE_TAB'; tabId: string; pane: PaneId }
    | { type: 'SET_ACTIVE_TAB'; tabId: string; pane: PaneId }
    | { type: 'SET_ACTIVE_PANE'; pane: PaneId }
    | { type: 'SPLIT_SCREEN'; file?: DbFile }
    | { type: 'CLOSE_SPLIT' }
    | { type: 'MOVE_TAB'; tabId: string; sourcePane: PaneId; targetPane: PaneId; index?: number }
    | { type: 'REORDER_TABS'; pane: PaneId; startIndex: number; endIndex: number }
    | { type: 'SET_PDF_PAGE'; tabId: string; page: number };

export interface DragItemFile {
    type: 'FILE';
    file: DbFile;
}

export interface DragItemTab {
    type: 'TAB';
    id: string; // Tab ID
    pane: PaneId;
    index: number;
}

export type DragItem = DragItemFile | DragItemTab;