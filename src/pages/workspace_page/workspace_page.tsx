import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Panel, Group, Separator } from 'react-resizable-panels';
import { WorkspaceSidebar } from '@/components/workspace/WorkspaceSidebar';
import { getUserFiles } from '@/lib/api';
import type { DbFile } from '@/model/DbFile';
import { SideBar } from "@/components/custom/side_bar";
import { WorkspaceProvider, useWorkspace, type PaneId } from '@/components/workspace/WorkspaceContext';
import { WorkspaceTabs } from '@/components/workspace/WorkspaceTabs';
import { cn } from '@/lib/utils';

export default function WorkspacePage() {
    return (
        <WorkspaceProvider>
            <DndProvider backend={HTML5Backend}>
                <WorkspaceLayout />
            </DndProvider>
        </WorkspaceProvider>
    );
}

function WorkspaceLayout() {
    const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(() => {
        const saved = sessionStorage.getItem("quizspark_sidebar_collapsed");
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        sessionStorage.setItem("quizspark_sidebar_collapsed", JSON.stringify(isSideBarCollapsed));
    }, [isSideBarCollapsed]);

    function toggleSideBar() {
        setIsSideBarCollapsed(!isSideBarCollapsed);
    }

    const { state, dispatch } = useWorkspace();
    const [files, setFiles] = useState<DbFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadFiles();
    }, []);

    const loadFiles = async () => {
        setIsLoading(true);
        try {
            const data = await getUserFiles();
            setFiles(data);
        } catch (error) {
            console.error("Failed to load files", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileSelect = (file: DbFile) => {
        dispatch({ type: 'OPEN_FILE', file: file, pane: state.activePane });
    };


    return (
        <div className="h-screen w-full flex bg-black text-white overflow-hidden font-sans">
            <SideBar
                isSideBarCollapsed={isSideBarCollapsed}
                toggleSideBar={toggleSideBar}
            />
            <WorkspaceSidebar
                files={files}
                isLoading={isLoading}
                onFileSelect={handleFileSelect}
                onUpload={loadFiles}
                selectedFileId={state.activeTab.left || undefined}
            />

            <main className="flex-1 flex flex-col bg-[#0b0b0b] transition-all duration-300 ml-0 h-full overflow-hidden">
                <div className="flex-1 overflow-hidden relative">
                    <Group orientation="horizontal" className="h-full">
                        <Panel defaultSize={state.layout === 'split' ? 50 : 100} minSize={20}>
                            <WorkspacePane pane="left" />
                        </Panel>

                        {state.layout === 'split' && (
                            <>
                                <Separator className="w-1.5 bg-black hover:bg-violet-600/50 transition-colors flex items-center justify-center group">
                                    <div className="w-[1px] h-8 bg-zinc-800 group-hover:bg-violet-400/50 rounded-full transition-colors" />
                                </Separator>
                                <Panel defaultSize={50} minSize={20}>
                                    <WorkspacePane pane="right" />
                                </Panel>
                            </>
                        )}
                    </Group>
                </div>
            </main>
        </div>
    );
}

interface WorkspacePaneProps {
    pane: PaneId;
}

import { PdfViewer } from '@/components/workspace/PdfViewer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function WorkspacePane({ pane }: WorkspacePaneProps) {
    const { state, dispatch } = useWorkspace();
    const activeTabId = state.activeTab[pane];
    const activeTab = state.panes[pane].find(t => t.id === activeTabId);

    const [{ isOver }, drop] = useDrop(() => ({
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
        collect: (monitor) => ({
            isOver: !!monitor.isOver({ shallow: true }),
        }),
    }), [pane]);

    return (
        <div
            ref={drop as any}
            className={cn(
                "h-full w-full flex flex-col bg-[#0f0f10] transition-colors duration-200 relative",
                state.activePane === pane ? 'ring-1 ring-inset ring-violet-500/30' : '',
                isOver && "bg-violet-600/5"
            )}
            onClick={() => dispatch({ type: 'SET_ACTIVE_PANE', pane })}
        >
            {isOver && (
                <div className="absolute inset-0 pointer-events-none border-2 border-violet-500/50 z-50 rounded-sm" />
            )}

            <WorkspaceTabs pane={pane} />

            <div className="flex-1 flex flex-col relative overflow-hidden">
                {activeTab ? (
                    <div className="flex-1 h-full overflow-hidden">
                        {activeTab.file.fileName.endsWith('.pdf') ? (
                            <PdfViewer
                                fileId={activeTab.file.id}
                                fileName={activeTab.file.fileName}
                                isActive={state.activePane === pane}
                            />
                        ) : activeTab.file.fileName.endsWith('.md') ? (
                            <div className="h-full w-full overflow-auto p-8 prose prose-invert prose-violet max-w-none bg-[#0b0b0b]">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {/* For now, just show the filename since we don't have the MD content yet */}
                                    {`# ${activeTab.file.fileName}\n\nMarkdown content loading implementation coming soon...`}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                                <h3 className="text-lg text-white mb-2">
                                    Viewing: {activeTab.file.fileName}
                                </h3>
                                <p className="font-mono text-xs text-zinc-600">ID: {activeTabId}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center p-8 max-w-sm">
                            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
                                <span className="text-3xl">✨</span>
                            </div>
                            <h2 className="text-xl font-semibold text-zinc-200 mb-2">Workspace Ready</h2>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                Select a file from the sidebar to start working.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
