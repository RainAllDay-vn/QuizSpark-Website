import { X, FileText, File as FileIcon, Columns, Square, Link2, Link2Off, Link as ChainIcon } from 'lucide-react';
import { useWorkspace } from './useWorkspace';
import { type PaneId, type Tab, type DragItem } from './workspace-types';
import { cn } from '@/lib/utils';
import { useDrag, useDrop } from 'react-dnd';
import React, { useRef } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WorkspaceTabsProps {
    pane: PaneId;
}

export function WorkspaceTabs({ pane }: WorkspaceTabsProps) {
    const { state, dispatch, linkFiles, unlinkFile, getLinkedGroup } = useWorkspace();
    const tabs = state.panes[pane];

    const activeTabId = state.activeTab[pane];
    const isLinked = activeTabId ? !!getLinkedGroup(activeTabId) : false;

    const handleLinkToggle = () => {
        if (!activeTabId) return;

        if (isLinked) {
            unlinkFile(activeTabId);
            return;
        }

        if (state.layout === 'split') {
            const otherPane = pane === 'left' ? 'right' : 'left';
            const otherTabId = state.activeTab[otherPane];
            if (otherTabId) {
                linkFiles(activeTabId, otherTabId);
            }
        }
    };

    const [, drop] = useDrop(() => ({
        accept: ['FILE', 'TAB'],
        drop: (item: DragItem, monitor) => {
            if (monitor.didDrop()) return;
            const itemType = monitor.getItemType();

            if (itemType === 'FILE' && item.type === 'FILE') {
                dispatch({ type: 'OPEN_FILE', file: item.file, pane });
            } else if (itemType === 'TAB' && item.type === 'TAB' && item.pane !== pane) {
                dispatch({ type: 'MOVE_TAB', tabId: item.id, sourcePane: item.pane, targetPane: pane });
            }
        },
    }), [pane]);

    return (
        <div
            ref={drop as unknown as React.Ref<HTMLDivElement>}
            className="flex items-center h-10 w-full bg-[#111112] border-b border-zinc-800 overflow-x-auto no-scrollbar group/tabs"
        >
            {tabs.map((tab, index) => (
                <DraggableTab
                    key={tab.id}
                    tab={tab}
                    index={index}
                    pane={pane}
                    isActive={tab.id === state.activeTab[pane]}
                />
            ))}

            <div className="flex-1 h-full bg-[#111112]" />

            <div className="flex items-center px-1 border-l border-zinc-800/50 h-full bg-[#111112] gap-1">
                {/* Link Button */}
                {activeTabId && (
                    state.layout === 'split' ? (
                         <button
                            title={isLinked ? "Unlink Files" : "Link with other pane"}
                            className={cn(
                                "p-1.5 rounded-md transition-all flex items-center gap-1.5",
                                isLinked
                                    ? "text-violet-400 bg-violet-500/10 hover:bg-violet-500/20"
                                    : "text-zinc-500 hover:text-white hover:bg-zinc-800"
                            )}
                            onClick={handleLinkToggle}
                        >
                            {isLinked ? <Link2Off className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
                        </button>
                    ) : (
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    title={isLinked ? "Unlink Files" : "Link with other file"}
                                    className={cn(
                                        "p-1.5 rounded-md transition-all flex items-center gap-1.5",
                                        isLinked
                                            ? "text-violet-400 bg-violet-500/10 hover:bg-violet-500/20"
                                            : "text-zinc-500 hover:text-white hover:bg-zinc-800"
                                    )}
                                >
                                    {isLinked ? <Link2Off className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-[#18181b] border-zinc-800 text-white">
                                {isLinked && (
                                    <DropdownMenuItem onClick={() => unlinkFile(activeTabId)}>
                                        <Link2Off className="mr-2 h-4 w-4" />
                                        <span>Unlink current file</span>
                                    </DropdownMenuItem>
                                )}
                                {!isLinked && tabs.length <= 1 && (
                                     <DropdownMenuItem disabled>
                                        <span className="text-zinc-500">No other tabs to link</span>
                                    </DropdownMenuItem>
                                )}
                                {!isLinked && tabs.map(tab => {
                                    if(tab.id === activeTabId) return null;
                                    return (
                                        <DropdownMenuItem
                                            key={tab.id}
                                            onClick={() => linkFiles(activeTabId, tab.id)}
                                        >
                                            <Link2 className="mr-2 h-4 w-4" />
                                            <span className="truncate">{tab.file.fileName}</span>
                                        </DropdownMenuItem>
                                    )
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                )}

                <div className="w-[1px] h-4 bg-zinc-800 mx-1" />

                {state.layout === 'single' ? (
                    <button
                        title="Split Screen"
                        className="p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-1.5"
                        onClick={() => dispatch({ type: 'SPLIT_SCREEN' })}
                    >
                        <Columns className="w-3.5 h-3.5" />
                    </button>
                ) : (
                    <button
                        title="Single Screen"
                        className="p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-1.5"
                        onClick={() => dispatch({ type: 'CLOSE_SPLIT' })}
                    >
                        <Square className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>
        </div>
    );
}

function DraggableTab({ tab, index, pane, isActive }: { tab: Tab; index: number; pane: PaneId; isActive: boolean }) {
    const { dispatch, getLinkedGroup } = useWorkspace();
    const ref = useRef<HTMLDivElement>(null);
    const isMd = tab.file.fileName.endsWith('.md');
    const isLinked = !!getLinkedGroup(tab.id);

    const [{ isDragging }, drag] = useDrag({
        type: 'TAB',
        item: { type: 'TAB', id: tab.id, pane, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'TAB',
        hover(item: DragItem) {
            if (!ref.current || item.type !== 'TAB') return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex && item.pane === pane) return;

            // Immediate reorder if in same pane
            if (item.pane === pane) {
                dispatch({ type: 'REORDER_TABS', pane, startIndex: dragIndex, endIndex: hoverIndex });
                item.index = hoverIndex; // Mutate monitor item to keep sync
            }
        },
        drop(item: DragItem) {
            if (item.type === 'TAB' && item.pane !== pane) {
                dispatch({ type: 'MOVE_TAB', tabId: item.id, sourcePane: item.pane, targetPane: pane, index });
            }
        }
    });

    return (
        <div
            ref={(node) => {
                drag(drop(node));
                ref.current = node;
            }}
            className={cn(
                "group flex items-center h-full px-3 min-w-[120px] max-w-[200px] border-r border-zinc-800/50 cursor-pointer select-none transition-colors relative",
                isActive
                    ? "bg-[#0b0b0b] text-white border-t-2 border-t-violet-600"
                    : "bg-[#151518] text-zinc-500 hover:bg-[#1a1a1c] hover:text-zinc-300",
                isDragging && "opacity-0"
            )}
            onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', tabId: tab.id, pane })}
        >
            <span className={cn("mr-2", isActive ? "text-violet-400" : "text-zinc-600")}>
                {isMd ? <FileText className="w-3.5 h-3.5" /> : <FileIcon className="w-3.5 h-3.5" />}
            </span>

            <span className="text-xs truncate flex-1 font-medium">{tab.file.fileName}</span>

            {isLinked && (
                <div className="ml-2 pointer-events-none">
                    <ChainIcon className="w-3 h-3 text-violet-500" />
                </div>
            )}

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
}
