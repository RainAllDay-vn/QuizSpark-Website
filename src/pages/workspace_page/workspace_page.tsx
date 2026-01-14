import {useCallback, useEffect, useRef, useState} from 'react';
import {DndProvider, useDrop} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {Group, Panel, Separator} from 'react-resizable-panels';
import {WorkspaceSidebar} from '@/components/workspace/WorkspaceSidebar';
import {getUserFiles, updateFileContent, viewFile} from '@/lib/api';
import type {DbFile} from '@/model/DbFile';
import {SideBar} from "@/components/custom/side_bar";
import {WorkspaceProvider} from '@/components/workspace/WorkspaceContext';
import {useWorkspace} from '@/components/workspace/useWorkspace';
import {type PaneId} from "@/components/workspace/workspace-types";
import {WorkspaceTabs} from '@/components/workspace/WorkspaceTabs';
import {cn} from '@/lib/utils';
import {PdfViewer} from '@/components/workspace/PdfViewer';
import {LiveMarkdownEditor} from '@/components/workspace/LiveMarkdownEditor';
import {useChatBot} from '@/components/chatbot/ChatBotContext';
import {AlertCircle, BookOpen, CheckCircle2, ChevronLeft, ChevronRight, LayoutList, Loader2} from 'lucide-react';
import {Button} from '@/components/ui/button';

export default function WorkspacePage() {
    return (
        <WorkspaceProvider>
            <DndProvider backend={HTML5Backend}>
                <WorkspaceLayout/>
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

    const {state, dispatch} = useWorkspace();
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
        dispatch({type: 'OPEN_FILE', file: file, pane: state.activePane});
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
                onDelete={loadFiles}
                selectedFileId={state.activeTab.left || undefined}
            />

            <main className="flex-1 flex flex-col bg-[#0b0b0b] transition-all duration-300 ml-0 h-full overflow-hidden">
                <div className="flex-1 overflow-hidden relative">
                    <Group orientation="horizontal" className="h-full">
                        <Panel defaultSize={state.layout === 'split' ? 50 : 100} minSize={20}>
                            <WorkspacePane pane="left"/>
                        </Panel>

                        {state.layout === 'split' && (
                            <>
                                <Separator
                                    className="w-1.5 bg-black hover:bg-violet-600/50 transition-colors flex items-center justify-center group">
                                    <div
                                        className="w-[1px] h-8 bg-zinc-800 group-hover:bg-violet-400/50 rounded-full transition-colors"/>
                                </Separator>
                                <Panel defaultSize={50} minSize={20}>
                                    <WorkspacePane pane="right"/>
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

interface DraggedFile {
    file: DbFile;
}

interface DraggedTab {
    id: string;
    pane: PaneId;
}

function WorkspacePane({pane}: WorkspacePaneProps) {
    const {state, dispatch} = useWorkspace();
    const activeTabId = state.activeTab[pane];
    const activeTab = state.panes[pane].find(t => t.id === activeTabId);
    const {registerContext, unregisterContext} = useChatBot();

    const handlePdfPageChange = useCallback((page: number) => {
        if (activeTabId) {
            dispatch({type: 'SET_PDF_PAGE', tabId: activeTabId, page});
        }
    }, [activeTabId, dispatch]);

    useEffect(() => {
        const contextId = `workspace-file-${pane}`;
        if (activeTab) {
            const isPdf = activeTab.file.fileName.toLowerCase().endsWith('.pdf');
            return registerContext({
                id: contextId,
                title: activeTab.file.fileName,
                content: async () => [{
                    type: "CONTEXT",
                    description: `WORKSPACE FILE`,
                    fileId: activeTab.file.id,
                    fileName: activeTab.file.fileName,
                    fileType: activeTab.file.fileType,
                    metadata: isPdf ? {page: activeTab.pdfPage || 0} : undefined
                }],
                metadata: {
                    fileId: activeTab.file.id,
                    pane,
                    ...(isPdf && {currentPage: activeTab.pdfPage || 1})
                }
            });
        } else {
            unregisterContext(contextId);
        }
    }, [activeTab?.id, activeTab?.file.id, activeTab?.pdfPage, pane, registerContext, unregisterContext, activeTab]);

    const [{isOver}, drop] = useDrop(() => ({
        accept: ['FILE', 'TAB'],
        drop: (item: DraggedFile | DraggedTab, monitor) => {
            if (monitor.didDrop()) return;
            const itemType = monitor.getItemType();

            if (itemType === 'FILE') {
                const fileItem = item as DraggedFile;
                dispatch({type: 'OPEN_FILE', file: fileItem.file, pane});
            } else if (itemType === 'TAB') {
                const tabItem = item as DraggedTab;
                if (tabItem.pane !== pane) {
                    dispatch({type: 'MOVE_TAB', tabId: tabItem.id, sourcePane: tabItem.pane, targetPane: pane});
                }
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver({shallow: true}),
        }),
    }), [pane]);

    return (
        <div
            ref={(node) => { drop(node); }}
            className={cn(
                "h-full w-full flex flex-col bg-[#0f0f10] transition-colors duration-200 relative",
                state.activePane === pane ? 'ring-1 ring-inset ring-violet-500/30' : '',
                isOver && "bg-violet-600/5"
            )}
            onClick={() => dispatch({type: 'SET_ACTIVE_PANE', pane})}
        >
            {isOver && (
                <div className="absolute inset-0 pointer-events-none border-2 border-violet-500/50 z-50 rounded-sm"/>
            )}

            <WorkspaceTabs pane={pane}/>

            <div className="flex-1 flex flex-col relative overflow-hidden">
                {activeTab ? (
                    <div className="flex-1 h-full overflow-hidden">
                        {activeTab?.file.fileName.endsWith('.pdf') ? (
                            <PdfViewer
                                fileId={activeTab.file.id}
                                fileName={activeTab.file.fileName}
                                isActive={state.activePane === pane}
                                onPageChange={handlePdfPageChange}
                            />
                        ) : activeTab?.file.fileName.endsWith('.md') ? (
                            <MarkdownFileEditor file={activeTab.file}/>
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
                            <div
                                className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
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

function MarkdownFileEditor({file}: { file: DbFile }) {
    const [content, setContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [wordCount, setWordCount] = useState(0);
    const [viewMode, setViewMode] = useState<'scroll' | 'page'>('scroll');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function loadContent() {
            setIsLoading(true);
            try {
                const blob = await viewFile(file.id);
                const text = await blob.text();
                setContent(text);
                updateStats(text);
            } catch (error) {
                console.error("Failed to load markdown content:", error);
                setContent("# Error\nFailed to load content.");
            } finally {
                setIsLoading(false);
            }
        }

        loadContent();
    }, [file.id]);

    const updateStats = (text: string) => {
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        setWordCount(words);

        const pages = text.split(/^---$/m);
        setTotalPages(pages.length);
    };

    const handleSave = async (newContent: string) => {
        setSaveStatus('saving');
        try {
            await updateFileContent(file.id, newContent);
            setSaveStatus('saved');
            updateStats(newContent);
            setTimeout(() => setSaveStatus('idle'), 3000);
        } catch (error) {
            console.error("Failed to save file:", error);
            setSaveStatus('error');
        }
    };

    // Simple debounce implementation to avoid adding dependencies if possible, 
    // or we can use a ref and timeout.
    const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const onContentChange = (newContent: string) => {
        setContent(newContent);
        setSaveStatus('idle');
        updateStats(newContent); // Update word count instantly

        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
            handleSave(newContent);
        }, 1000); // 1s debounce
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
                <Loader2 className="w-8 h-8 text-violet-500 animate-spin"/>
                <p className="text-sm text-zinc-500">Loading {file.fileName}...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full bg-[#0b0b0b] relative">
            {/* Toolbar - Matching PdfViewer Style */}
            <div
                className="flex items-center justify-between p-2 border-b border-zinc-800 bg-[#111112] z-10 space-x-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center space-x-4">
                    <span
                        className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest truncate max-w-[150px]">
                        {file.fileName}
                    </span>
                    <div className="h-4 w-[1px] bg-zinc-800"/>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-white"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage <= 1}
                        >
                            <ChevronLeft className="h-4 w-4"/>
                        </Button>
                        <span className="text-xs text-zinc-400 font-medium whitespace-nowrap">
                            <input
                                type="text"
                                value={currentPage}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (!isNaN(val) && val >= 1 && val <= totalPages) {
                                        setCurrentPage(val);
                                    }
                                }}
                                className="w-8 bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-violet-500 rounded"
                            />
                             / {totalPages || '--'}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-white"
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage >= totalPages}
                        >
                            <ChevronRight className="h-4 w-4"/>
                        </Button>
                    </div>
                    <div className="h-4 w-[1px] bg-zinc-800"/>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "h-8 w-8 text-zinc-400 hover:text-white transition-colors",
                            viewMode === 'page' && "text-violet-400 bg-violet-400/10"
                        )}
                        onClick={() => setViewMode(viewMode === 'scroll' ? 'page' : 'scroll')}
                        title={viewMode === 'scroll' ? "Switch to Page Mode" : "Switch to Scroll Mode"}
                    >
                        {viewMode === 'scroll' ? (
                            <LayoutList className="h-4 w-4" />
                        ) : (
                            <BookOpen className="h-4 w-4" />
                        )}
                    </Button>
                </div>

                <div className="flex items-center space-x-3 px-2">
                    {saveStatus === 'saving' && (
                        <div className="flex items-center space-x-1.5 text-violet-400">
                            <Loader2 className="h-3 w-3 animate-spin"/>
                            <span className="text-[10px] font-bold uppercase tracking-wider">Saving...</span>
                        </div>
                    )}
                    {saveStatus === 'saved' && (
                        <div className="flex items-center space-x-1.5 text-emerald-500">
                            <CheckCircle2 className="h-3 w-3"/>
                            <span className="text-[10px] font-bold uppercase tracking-wider">Saved</span>
                        </div>
                    )}
                    {saveStatus === 'error' && (
                        <div className="flex items-center space-x-1.5 text-rose-500">
                            <AlertCircle className="h-3 w-3"/>
                            <span className="text-[10px] font-bold uppercase tracking-wider">Save Error</span>
                        </div>
                    )}
                </div>
                <div
                    className="flex items-center space-x-2 text-[10px] font-medium text-zinc-500 uppercase tracking-widest">
                    <span>{wordCount} WORDS</span>
                    <div className="h-3 w-[1px] bg-zinc-800/50"/>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative">
                <LiveMarkdownEditor
                    initialContent={content || ''}
                    onSave={onContentChange}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    viewMode={viewMode}
                />
            </div>
        </div>
    );
}
