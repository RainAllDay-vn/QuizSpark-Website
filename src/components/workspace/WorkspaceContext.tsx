import { useReducer, type ReactNode, useCallback } from 'react';
import type { Tab, WorkspaceState, WorkspaceAction } from './workspace-types';
import { WorkspaceContext } from './useWorkspace';

// --- Initial State ---

const initialState: WorkspaceState = {
    layout: 'single',
    panes: { left: [], right: [] },
    activeTab: { left: null, right: null },
    activePane: 'left',
    linkedGroups: [],
};

// --- Reducer ---

function workspaceReducer(state: WorkspaceState, action: WorkspaceAction): WorkspaceState {
    switch (action.type) {
        case 'OPEN_FILE': {
            const targetPane = action.pane || state.activePane;
            // Prevent duplicates? Browser allows it. Let's strictly allow it.
            // Create unique ID
            const newId = action.newTabId || `${action.file.id}-${Date.now()}-${Math.random()}`;
            const newTab: Tab = { id: newId, file: action.file };

            return {
                ...state,
                panes: {
                    ...state.panes,
                    [targetPane]: [...state.panes[targetPane], newTab]
                },
                activeTab: {
                    ...state.activeTab,
                    [targetPane]: newTab.id
                },
                activePane: targetPane
            };
        }
        case 'CLOSE_TAB': {
            const { tabId, pane } = action;
            const newTabs = state.panes[pane].filter(t => t.id !== tabId);

            let newActiveTab = state.activeTab[pane];
            if (state.activeTab[pane] === tabId) {
                newActiveTab = newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null;
            }

            // Unlink file if it was linked
            let newLinkedGroups = state.linkedGroups;
            const groupIndex = state.linkedGroups.findIndex(g => g.fileIds.has(tabId));
            if (groupIndex !== -1) {
                const group = state.linkedGroups[groupIndex];
                const newFileIds = new Set(group.fileIds);
                newFileIds.delete(tabId);

                if (newFileIds.size <= 1) {
                    // Disband group
                    newLinkedGroups = state.linkedGroups.filter((_, i) => i !== groupIndex);
                } else {
                    // Update group
                    newLinkedGroups = state.linkedGroups.map((g, i) =>
                        i === groupIndex ? { ...g, fileIds: newFileIds } : g
                    );
                }
            }

            return {
                ...state,
                panes: { ...state.panes, [pane]: newTabs },
                activeTab: { ...state.activeTab, [pane]: newActiveTab },
                linkedGroups: newLinkedGroups
            };
        }
        case 'SET_ACTIVE_TAB': {
            return {
                ...state,
                activeTab: { ...state.activeTab, [action.pane]: action.tabId },
                activePane: action.pane
            };
        }
        case 'SET_ACTIVE_PANE': {
            return { ...state, activePane: action.pane };
        }
        case 'SPLIT_SCREEN': {
            if (state.layout === 'split') return state;
            return {
                ...state,
                layout: 'split',
                activePane: 'right'
            };
        }
        case 'CLOSE_SPLIT': {
            return {
                ...state,
                layout: 'single',
                panes: {
                    left: [...state.panes.left, ...state.panes.right],
                    right: []
                },
                activePane: 'left'
            };
        }
        case 'MOVE_TAB': {
            const { tabId, sourcePane, targetPane, index } = action;
            const tabToMove = state.panes[sourcePane].find(t => t.id === tabId);
            if (!tabToMove) return state;

            // Remove from source
            const sourceTabs = state.panes[sourcePane].filter(t => t.id !== tabId);

            // Add to target
            const targetTabs = [...state.panes[targetPane]];
            if (typeof index === 'number') {
                targetTabs.splice(index, 0, tabToMove);
            } else {
                targetTabs.push(tabToMove);
            }

            // Update active tabs
            let newSourceActive = state.activeTab[sourcePane];
            if (newSourceActive === tabId) {
                newSourceActive = sourceTabs.length > 0 ? sourceTabs[sourceTabs.length - 1].id : null;
            }

            return {
                ...state,
                panes: {
                    ...state.panes,
                    [sourcePane]: sourceTabs,
                    [targetPane]: targetTabs
                },
                activeTab: {
                    ...state.activeTab,
                    [sourcePane]: newSourceActive,
                    [targetPane]: tabId
                },
                activePane: targetPane
            };
        }
        case 'REORDER_TABS': {
            const { pane, startIndex, endIndex } = action;
            const result = [...state.panes[pane]];
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);

            return {
                ...state,
                panes: {
                    ...state.panes,
                    [pane]: result
                }
            };
        }
        case 'SET_PDF_PAGE': {
            const { tabId, page } = action;
            
            // Allow this to update just one file, OR handle synced updates if it's part of a group?
            // The SYNC_LINKED_PAGE action is specifically for the synced behavior.
            // SET_PDF_PAGE is low-level, but if we want basic PDF interactions to sync, we might want to check here too.
            // However, the task description says "SYNC_LINKED_PAGE action: ... Update pdfPage for ALL tabs in the group"
            // So we'll assume SET_PDF_PAGE stays local, and the specific sync action is used when needed.
            
            const updatePane = (pane: Tab[]) =>
                pane.map(t => (t.id === tabId ? { ...t, pdfPage: page } : t));

            return {
                ...state,
                panes: {
                    left: updatePane(state.panes.left),
                    right: updatePane(state.panes.right),
                },
            };
        }
        case 'LINK_FILES': {
            const { fileId1, fileId2 } = action;
            if (fileId1 === fileId2) return state;

            const group1Index = state.linkedGroups.findIndex(g => g.fileIds.has(fileId1));
            const group2Index = state.linkedGroups.findIndex(g => g.fileIds.has(fileId2));

            let newLinkedGroups = [...state.linkedGroups];

            if (group1Index === -1 && group2Index === -1) {
                // Create new group
                newLinkedGroups.push({
                    id: crypto.randomUUID(),
                    fileIds: new Set([fileId1, fileId2]),
                    currentPage: 1 // Default start page
                });
            } else if (group1Index !== -1 && group2Index === -1) {
                // Add file2 to group1
                const group = newLinkedGroups[group1Index];
                const newFileIds = new Set(group.fileIds);
                newFileIds.add(fileId2);
                newLinkedGroups[group1Index] = { ...group, fileIds: newFileIds };
            } else if (group1Index === -1 && group2Index !== -1) {
                // Add file1 to group2
                const group = newLinkedGroups[group2Index];
                const newFileIds = new Set(group.fileIds);
                newFileIds.add(fileId1);
                newLinkedGroups[group2Index] = { ...group, fileIds: newFileIds };
            } else if (group1Index !== -1 && group2Index !== -1 && group1Index !== group2Index) {
                // Merge groups
                const group1 = newLinkedGroups[group1Index];
                const group2 = newLinkedGroups[group2Index];
                const mergedFileIds = new Set([...group1.fileIds, ...group2.fileIds]);
                
                // Keep group1, remove group2
                newLinkedGroups[group1Index] = { ...group1, fileIds: mergedFileIds };
                newLinkedGroups = newLinkedGroups.filter((_, i) => i !== group2Index);
            }

            // Sync pages initially when linking?
            // The spec doesn't explicitly say, but it's good practice.
            // We'll leave it as is for now as the logic above just handles grouping.

            return { ...state, linkedGroups: newLinkedGroups };
        }
        case 'UNLINK_FILE': {
            const { fileId } = action;
            const groupIndex = state.linkedGroups.findIndex(g => g.fileIds.has(fileId));
            
            if (groupIndex === -1) return state;

            let newLinkedGroups = [...state.linkedGroups];
            const group = newLinkedGroups[groupIndex];
            const newFileIds = new Set(group.fileIds);
            newFileIds.delete(fileId);

            if (newFileIds.size <= 1) {
                // Disband group
                newLinkedGroups = newLinkedGroups.filter((_, i) => i !== groupIndex);
            } else {
                newLinkedGroups[groupIndex] = { ...group, fileIds: newFileIds };
            }

            return { ...state, linkedGroups: newLinkedGroups };
        }
        case 'SYNC_LINKED_PAGE': {
            const { fileId, page } = action;
            const groupIndex = state.linkedGroups.findIndex(g => g.fileIds.has(fileId));
            
            if (groupIndex === -1) {
                // Fallback to updating just this file if not linked?
                // The action implies "Linked Page", so maybe just no-op or normal update.
                // Let's do a normal update for the specific file just in case, but usually this is for groups.
                 const updatePane = (pane: Tab[]) =>
                    pane.map(t => (t.id === fileId ? { ...t, pdfPage: page } : t));

                return {
                    ...state,
                    panes: {
                        left: updatePane(state.panes.left),
                        right: updatePane(state.panes.right),
                    },
                };
            }

            const group = state.linkedGroups[groupIndex];
            const updatedGroup = { ...group, currentPage: page };
            const newLinkedGroups = state.linkedGroups.map((g, i) => i === groupIndex ? updatedGroup : g);

            // Update pdfPage for ALL tabs in the group
            const updatePaneWithGroup = (pane: Tab[]) =>
                pane.map(t => (group.fileIds.has(t.id) ? { ...t, pdfPage: page } : t));

            return {
                ...state,
                linkedGroups: newLinkedGroups,
                panes: {
                    left: updatePaneWithGroup(state.panes.left),
                    right: updatePaneWithGroup(state.panes.right),
                }
            };
        }
        default:
            return state;
    }
}

// --- Context ---

export function WorkspaceProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(workspaceReducer, initialState);

    const linkFiles = useCallback((fileId1: string, fileId2: string) => {
        dispatch({ type: 'LINK_FILES', fileId1, fileId2 });
    }, []);

    const unlinkFile = useCallback((fileId: string) => {
        dispatch({ type: 'UNLINK_FILE', fileId });
    }, []);

    const syncLinkedPage = useCallback((fileId: string, page: number) => {
        dispatch({ type: 'SYNC_LINKED_PAGE', fileId, page });
    }, []);

    const getLinkedGroup = useCallback((fileId: string) => {
        return state.linkedGroups.find(g => g.fileIds.has(fileId));
    }, [state.linkedGroups]);

    const getLinkedFiles = useCallback((fileId: string) => {
        const group = state.linkedGroups.find(g => g.fileIds.has(fileId));
        if (!group) return [];
        return Array.from(group.fileIds).filter(id => id !== fileId);
    }, [state.linkedGroups]);

    const value = {
        state,
        dispatch,
        linkFiles,
        unlinkFile,
        syncLinkedPage,
        getLinkedGroup,
        getLinkedFiles
    };

    return (
        <WorkspaceContext.Provider value={value}>
            {children}
        </WorkspaceContext.Provider>
    );
}
