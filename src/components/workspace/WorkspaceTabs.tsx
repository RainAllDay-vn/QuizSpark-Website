import { X, FileText, File, Columns, Square } from 'lucide-react';
import { useWorkspace, type PaneId } from './WorkspaceContext';
import { cn } from '@/lib/utils';

interface WorkspaceTabsProps {
    pane: PaneId;
}

export function WorkspaceTabs({ pane }: WorkspaceTabsProps) {
    const { state, dispatch } = useWorkspace();
    const tabs = state.panes[pane];
    const activeTabId = state.activeTab[pane];

    if (tabs.length === 0) return null;

    return (
        <div className="flex items-center h-10 w-full bg-[#111112] border-b border-zinc-800 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
                const isActive = tab.id === activeTabId;
                const isMd = tab.file.fileName.endsWith('.md');

                return (
                    <div
                        key={tab.id}
                        className={cn(
                            "group flex items-center h-full px-3 min-w-[120px] max-w-[200px] border-r border-zinc-800/50 cursor-pointer select-none transition-colors",
                            isActive
                                ? "bg-[#0b0b0b] text-white border-t-2 border-t-violet-600"
                                : "bg-[#151518] text-zinc-500 hover:bg-[#1a1a1c] hover:text-zinc-300"
                        )}
                        onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', tabId: tab.id, pane })}
                    >
                        {/* Icon */}
                        <span className={cn("mr-2", isActive ? "text-violet-400" : "text-zinc-600")}>
                            {isMd ? <FileText className="w-3.5 h-3.5" /> : <File className="w-3.5 h-3.5" />}
                        </span>

                        {/* Filename */}
                        <span className="text-xs truncate flex-1 font-medium">{tab.file.fileName}</span>

                        {/* Close Button - Visible on hover or if active */}
                        <div
                            className={cn(
                                "ml-2 p-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-700",
                                isActive && "opacity-100"
                            )}
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch({ type: 'CLOSE_TAB', tabId: tab.id, pane });
                            }}
                        >
                            <X className="w-3 h-3" />
                        </div>
                    </div>
                );
            })}

            {/* Empty space filler */}
            <div className="flex-1 h-full bg-[#111112]" />

            {/* Layout Controls */}
            <div className="flex items-center px-1 border-l border-zinc-800/50 h-full bg-[#111112]">
                {state.layout === 'single' ? (
                    <button
                        title="Split Screen"
                        className="p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-1.5"
                        onClick={() => dispatch({ type: 'SPLIT_SCREEN' })}
                    >
                        <Columns className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-medium uppercase tracking-wider">Split</span>
                    </button>
                ) : (
                    <button
                        title="Single Screen"
                        className="p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-1.5"
                        onClick={() => dispatch({ type: 'CLOSE_SPLIT' })}
                    >
                        <Square className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-medium uppercase tracking-wider">Single</span>
                    </button>
                )}
            </div>
        </div>
    );
}
