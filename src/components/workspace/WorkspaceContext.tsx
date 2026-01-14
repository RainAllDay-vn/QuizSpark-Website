import { useReducer, type ReactNode } from 'react';
import type { Tab, WorkspaceState, WorkspaceAction } from './workspace-types';
import { WorkspaceContext } from './useWorkspace';

// --- Initial State ---

const initialState: WorkspaceState = {
    layout: 'single',
    panes: { left: [], right: [] },
    activeTab: { left: null, right: null },
    activePane: 'left',
};

// --- Reducer ---

function workspaceReducer(state: WorkspaceState, action: WorkspaceAction): WorkspaceState {
    switch (action.type) {
        case 'OPEN_FILE': {
            const targetPane = action.pane || state.activePane;
            // Prevent duplicates? Browser allows it. Let's strictly allow it.
            // Create unique ID
            const newTab: Tab = { id: `${action.file.id}-${Date.now()}-${Math.random()}`, file: action.file };

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

            return {
                ...state,
                panes: { ...state.panes, [pane]: newTabs },
                activeTab: { ...state.activeTab, [pane]: newActiveTab }
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
        default:
            return state;
    }
}

// --- Context ---

export function WorkspaceProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(workspaceReducer, initialState);

    return (
        <WorkspaceContext.Provider value={{ state, dispatch }}>
            {children}
        </WorkspaceContext.Provider>
    );
}
