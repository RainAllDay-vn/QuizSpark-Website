import { useState, useEffect } from 'react';
import { Panel, Group } from 'react-resizable-panels';
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
        dispatch({ type: 'OPEN_FILE', file: file });
    };

    return (
        <div className="h-screen w-full flex bg-black text-white overflow-hidden">
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
                        <Panel defaultSize={20}>
                            <div className="h-full w-full flex flex-col bg-[#0f0f10]">
                                <WorkspaceTabs pane="left" />

                                <div className="flex-1 flex items-center justify-center text-zinc-500 relative overflow-hidden">
                                    {state.activeTab.left ? (
                                        <div className="text-center">
                                            <h3 className="text-lg text-white mb-2">
                                                Viewing: {state.panes.left.find(t => t.id === state.activeTab.left)?.file.fileName}
                                            </h3>
                                            <p className="font-mono text-xs text-zinc-600">ID: {state.activeTab.left}</p>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <h2 className="text-xl font-medium text-zinc-300 mb-2">Workspace Ready</h2>
                                            <p className="mb-4 text-zinc-500">Select a file from the sidebar to view.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Panel>
                    </Group>
                </div>
            </main>
        </div>
    );
}
