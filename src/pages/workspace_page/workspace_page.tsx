import { useState, useEffect } from 'react';
import { Panel, Group, Separator } from 'react-resizable-panels';
import { WorkspaceSidebar } from '@/components/workspace/WorkspaceSidebar';
import { getUserFiles } from '@/lib/api';
import type { DbFile } from '@/model/DbFile';
import { SideBar } from "@/components/custom/side_bar";
import { WorkspaceProvider, useWorkspace } from '@/components/workspace/WorkspaceContext';
import { WorkspaceTabs } from '@/components/workspace/WorkspaceTabs';

export default function WorkspacePage() {
    return (
        <WorkspaceProvider>
            <WorkspaceLayout />
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

    const renderPane = (pane: 'left' | 'right') => {
        const activeTabId = state.activeTab[pane];
        const activeTab = state.panes[pane].find(t => t.id === activeTabId);

        return (
            <div className={`h-full w-full flex flex-col bg-[#0f0f10] ${state.activePane === pane ? 'ring-1 ring-inset ring-violet-500/30' : ''}`}
                onClick={() => dispatch({ type: 'SET_ACTIVE_PANE', pane })}>
                <WorkspaceTabs pane={pane} />

                <div className="flex-1 flex items-center justify-center text-zinc-500 relative overflow-hidden">
                    {activeTab ? (
                        <div className="text-center">
                            <h3 className="text-lg text-white mb-2">
                                Viewing: {activeTab.file.fileName}
                            </h3>
                            <p className="font-mono text-xs text-zinc-600">ID: {activeTabId}</p>
                        </div>
                    ) : (
                        <div className="text-center p-8 max-w-sm">
                            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
                                <span className="text-3xl">✨</span>
                            </div>
                            <h2 className="text-xl font-semibold text-zinc-200 mb-2">Workspace Ready</h2>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                Select a file from the sidebar to start working.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
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
                            {renderPane('left')}
                        </Panel>

                        {state.layout === 'split' && (
                            <>
                                <Separator className="w-1.5 bg-black hover:bg-violet-600/50 transition-colors flex items-center justify-center group">
                                    <div className="w-[1px] h-8 bg-zinc-800 group-hover:bg-violet-400/50 rounded-full transition-colors" />
                                </Separator>
                                <Panel defaultSize={50} minSize={20}>
                                    {renderPane('right')}
                                </Panel>
                            </>
                        )}
                    </Group>
                </div>
            </main>
        </div>
    );
}
