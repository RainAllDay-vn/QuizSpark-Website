import { createContext, useContext } from 'react';
import type { WorkspaceState, WorkspaceAction } from './workspace-types';

export const WorkspaceContext = createContext<{
    state: WorkspaceState;
    dispatch: React.Dispatch<WorkspaceAction>;
} | null>(null);

export function useWorkspace() {
    const context = useContext(WorkspaceContext);
    if (!context) throw new Error("useWorkspace must be used within WorkspaceProvider");
    return context;
}