import { createContext, useContext } from 'react';
import type { WorkspaceState, WorkspaceAction, LinkedGroup } from './workspace-types';

export interface WorkspaceContextType {
    state: WorkspaceState;
    dispatch: React.Dispatch<WorkspaceAction>;
    linkFiles: (fileId1: string, fileId2: string) => void;
    unlinkFile: (fileId: string) => void;
    syncLinkedPage: (fileId: string, page: number) => void;
    getLinkedGroup: (fileId: string) => LinkedGroup | undefined;
    getLinkedFiles: (fileId: string) => string[];
}

export const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export function useWorkspace() {
    const context = useContext(WorkspaceContext);
    if (!context) throw new Error("useWorkspace must be used within WorkspaceProvider");
    return context;
}