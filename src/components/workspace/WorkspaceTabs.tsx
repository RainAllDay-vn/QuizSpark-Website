import { X, FileText, File as FileIcon, Columns, Square } from 'lucide-react';
import { useWorkspace, type PaneId, type Tab } from './WorkspaceContext';
import { cn } from '@/lib/utils';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

interface WorkspaceTabsProps {
    pane: PaneId;
}

export function WorkspaceTabs({ pane }: WorkspaceTabsProps) {
    const { state, dispatch } = useWorkspace();
    const tabs = state.panes[pane];

    const [, drop] = useDrop(() => ({
        accept: ['FILE', 'TAB'],
        drop: (item: any, monitor) => {
            if (monitor.didDrop()) return;
            const itemType = monitor.getItemType();

            if (itemType === 'FILE') {
                dispatch({ type: 'OPEN_FILE', file: item.file, pane });
            } else if (itemType === 'TAB' && item.pane !== pane) {
                dispatch({ type: 'MOVE_TAB', tabId: item.id, sourcePane: item.pane, targetPane: pane });
            }
        },
    }), [pane]);

    return (
        <div
            ref={drop as any}
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

function DraggableTab({ tab, index, pane, isActive }: { tab: Tab; index: number; pane: PaneId; isActive: boolean }) {
    const { dispatch } = useWorkspace();
    const ref = useRef<HTMLDivElement>(null);
    const isMd = tab.file.fileName.endsWith('.md');

    const [{ isDragging }, drag] = useDrag({
        type: 'TAB',
        item: { type: 'TAB', id: tab.id, pane, index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'TAB',
        hover(item: any) {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex && item.pane === pane) return;

            // Immediate reorder if in same pane
            if (item.pane === pane) {
                dispatch({ type: 'REORDER_TABS', pane, startIndex: dragIndex, endIndex: hoverIndex });
                item.index = hoverIndex;
            }
        },
        drop(item: any) {
            if (item.pane !== pane) {
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
