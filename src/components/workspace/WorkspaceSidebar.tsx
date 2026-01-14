import { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { Search, Loader2, FileText, Upload, ChevronLeft, ChevronRight, File as FileIcon, Trash2, StickyNote, Link2, Link2Off } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWorkspace } from './useWorkspace';
import type { DbFile } from '@/model/DbFile';
import { uploadFileIndependent, deleteFilePermanent, createNoteForPdf } from '@/lib/api';
import { ScrollArea } from '../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import clsx from 'clsx';

interface WorkspaceSidebarProps {
    files: DbFile[];
    isLoading: boolean;
    onFileSelect: (file: DbFile) => void;
    onUpload?: () => void;
    onDelete?: () => void;
    selectedFileId?: string;
}

export function WorkspaceSidebar({ files, isLoading, onFileSelect, onUpload, onDelete, selectedFileId }: WorkspaceSidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(() => {
        const saved = sessionStorage.getItem("quizspark_workspace_sidebar_collapsed");
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        sessionStorage.setItem("quizspark_workspace_sidebar_collapsed", JSON.stringify(isCollapsed));
    }, [isCollapsed]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<'all' | 'pdf' | 'md'>('all');
    const [isUploading, setIsUploading] = useState(false);

    const filteredFiles = files.filter(file => {
        const matchesSearch = file.fileName.toLowerCase().includes(searchQuery.toLowerCase());
        const ext = file.fileName.split('.').pop()?.toLowerCase();
        const matchesType = filterType === 'all'
            ? true
            : filterType === 'pdf'
                ? (ext === 'pdf' || file.fileType.includes('pdf'))
                : (ext === 'md' || file.fileName.endsWith('.md'));

        return matchesSearch && matchesType;
    });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        if (!file.name.endsWith('.pdf') && !file.name.endsWith('.md')) {
            alert("Only .pdf and .md files are supported for now.");
            return;
        }

        setIsUploading(true);
        try {
            await uploadFileIndependent(file);
            if (onUpload) onUpload();
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload file");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteFile = async (e: React.MouseEvent, fileId: string) => {
        e.stopPropagation(); // Prevent opening the file
        if (!confirm("Are you sure you want to delete this file? This cannot be undone.")) return;
        
        try {
            await deleteFilePermanent(fileId);
            if (onDelete) onDelete();
        } catch (error) {
            console.error("Failed to delete file", error);
            alert("Failed to delete file");
        }
    };

    const handleCreateNote = async (e: React.MouseEvent, file: DbFile) => {
        e.stopPropagation();
        try {
            const newNote = await createNoteForPdf(file.id);
            if (onUpload) onUpload(); // Refresh list
            if (onFileSelect) onFileSelect(newNote); // Open the new note
        } catch (error) {
            console.error("Failed to create note", error);
            alert("Failed to create note for PDF");
        }
    };

    return (
        <aside
            className={clsx(
                "flex flex-col h-full bg-[#151518] border-r border-zinc-800 text-white transition-all duration-300 overflow-hidden",
                isCollapsed ? "w-16" : "w-64"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between h-16 p-4 border-b border-zinc-800">
                {!isCollapsed && (
                    <div className="text-xl font-semibold tracking-tight text-white">
                        Files
                    </div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1 rounded-md hover:bg-[#1a1a1c] transition-colors ml-auto"
                >
                    {isCollapsed ? (
                        <ChevronRight className="h-5 w-5 text-zinc-400" />
                    ) : (
                        <ChevronLeft className="h-5 w-5 text-zinc-400" />
                    )}
                </button>
            </div>

            {/* Controls */}
            {!isCollapsed && (
                <div className="p-4 space-y-3 border-b border-zinc-800/50">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-black/20 border-zinc-800 h-9 pl-9 text-sm focus-visible:ring-violet-600/50 text-white"
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="flex bg-black/20 rounded-md p-1 border border-zinc-800 flex-1">
                            {(['all', 'pdf', 'md'] as const).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={clsx(
                                        "flex-1 text-[10px] uppercase font-medium rounded py-1 px-2 transition-all",
                                        filterType === type ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                                    )}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                onChange={handleFileUpload}
                                accept=".pdf,.md"
                            />
                            <label htmlFor="file-upload">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-9 w-9 border-zinc-700 hover:border-violet-500 hover:bg-violet-500/10 hover:text-violet-400 bg-transparent text-zinc-400"
                                    asChild
                                >
                                    <span className="cursor-pointer">
                                        {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                    </span>
                                </Button>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {/* File List */}
            <ScrollArea className="flex-1 w-full overflow-x-hidden">
                <div className={clsx("px-2 py-4 space-y-1", isCollapsed ? "w-16" : "w-64")}>
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="w-5 h-5 animate-spin text-zinc-600" />
                        </div>
                    ) : (
                        filteredFiles.map((file) => (
                            <DraggableFileItem
                                key={file.id}
                                file={file}
                                allFiles={files}
                                isCollapsed={isCollapsed}
                                selectedFileId={selectedFileId}
                                onFileSelect={onFileSelect}
                                onDelete={handleDeleteFile}
                                onCreateNote={handleCreateNote}
                            />
                        ))
                    )}
                </div>
            </ScrollArea>
        </aside>
    );
}
function DraggableFileItem({ file, allFiles, isCollapsed, selectedFileId, onFileSelect, onDelete, onCreateNote }: {
    file: DbFile,
    allFiles: DbFile[],
    isCollapsed: boolean,
    selectedFileId?: string,
    onFileSelect: (file: DbFile) => void,
    onDelete: (e: React.MouseEvent, fileId: string) => void,
    onCreateNote: (e: React.MouseEvent, file: DbFile) => void
}) {
    const [isCreatingNote, setIsCreatingNote] = useState(false);
    const { state, dispatch, linkFiles, unlinkFile, getLinkedGroup } = useWorkspace();

    // Find active tabs for this file and its parent
    const findTabId = (fileId: string) => {
        const left = state.panes.left.find(t => t.file.id === fileId);
        if (left) return left.id;
        const right = state.panes.right.find(t => t.file.id === fileId);
        if (right) return right.id;
        return undefined;
    };

    const currentTabId = findTabId(file.id);
    const parentTabId = file.parentId ? findTabId(file.parentId) : undefined;

    // Check if this file is linked to its parent
    const linkedGroup = currentTabId ? getLinkedGroup(currentTabId) : undefined;
    const isLinkedToParent = !!(file.parentId && linkedGroup && parentTabId && linkedGroup.fileIds.has(parentTabId));

    const handleToggleLink = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!file.parentId) return;

        if (isLinkedToParent && currentTabId) {
            unlinkFile(currentTabId);
        } else {
            // New logic: Ensure files are open then link
            
            // 1. Ensure Child (Current) Tab exists
            let targetChildTabId = currentTabId;
            let childPane: 'left' | 'right' = state.activePane;

            if (!targetChildTabId) {
                targetChildTabId = crypto.randomUUID();
                dispatch({
                    type: 'OPEN_FILE',
                    file: file,
                    pane: state.activePane,
                    newTabId: targetChildTabId
                });
            } else {
                // Identify pane of existing child tab
                if (state.panes.left.some(t => t.id === targetChildTabId)) childPane = 'left';
                else childPane = 'right';
            }

            // 2. Ensure Parent Tab exists
            let targetParentTabId = parentTabId;
            if (!targetParentTabId) {
                const parentFile = allFiles.find(f => f.id === file.parentId);
                
                if (parentFile) {
                    targetParentTabId = crypto.randomUUID();
                    // Open in opposite pane
                    const parentPane = childPane === 'left' ? 'right' : 'left';
                    
                    // If opening in right pane and layout is single, switch to split
                    if (state.layout === 'single' && parentPane === 'right') {
                        dispatch({ type: 'SPLIT_SCREEN' });
                    }

                    dispatch({
                        type: 'OPEN_FILE',
                        file: parentFile,
                        pane: parentPane,
                        newTabId: targetParentTabId
                    });
                }
            }

            // 3. Link them
            if (targetChildTabId && targetParentTabId) {
                linkFiles(targetChildTabId, targetParentTabId);
            }
        }
    };

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'FILE',
        item: { type: 'FILE', file },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [file]);

    return (
        <>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            ref={drag as never}
                            onClick={() => onFileSelect(file)}
                            className={clsx(
                                "flex items-center w-full min-w-0 overflow-hidden px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-[#1a1a1c] hover:text-white cursor-pointer group",
                                isCollapsed ? "justify-center px-1.5" : "",
                                selectedFileId === file.id ? "bg-violet-600/20 border border-violet-600/40 text-violet-400 shadow-sm" : "text-zinc-400 border border-transparent",
                                isDragging && "opacity-50 grayscale"
                            )}
                        >
                            <div className={clsx(
                                "relative shrink-0 transition-colors",
                                isCollapsed ? "" : "mr-3",
                                selectedFileId === file.id ? "text-violet-400" : "text-zinc-400 group-hover:text-white"
                            )}>
                                {file.fileName.endsWith('.md') ? <FileText className="h-5 w-5" /> : <FileIcon className="h-5 w-5" />}
                                {file.fileName.endsWith('.pdf') && (
                                    <span className="absolute -bottom-1 -right-1 text-[8px] font-bold bg-red-900/80 text-red-200 px-0.5 rounded">PDF</span>
                                )}
                                {file.fileName.endsWith('.md') && (
                                    <span className="absolute -bottom-1 -right-1 text-[8px] font-bold bg-blue-900/80 text-blue-200 px-0.5 rounded">MD</span>
                                )}
                            </div>

                            {!isCollapsed && (
                                <>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium truncate">{file.fileName}</p>
                                        <p className="text-[10px] text-zinc-500 truncate">{new Date(file.uploadDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        {file.fileName.toLowerCase().endsWith('.pdf') && (
                                            <div
                                                className="p-1 hover:bg-violet-500/20 rounded-md text-zinc-500 hover:text-violet-400 mr-1"
                                                onClick={async (e) => {
                                                    setIsCreatingNote(true);
                                                    await onCreateNote(e, file);
                                                    setIsCreatingNote(false);
                                                }}
                                                title="Create Note"
                                            >
                                                {isCreatingNote ? (
                                                    <Loader2 className="h-4 w-4 animate-spin"/>
                                                ) : (
                                                    <StickyNote className="h-4 w-4" />
                                                )}
                                            </div>
                                        )}
                                        {file.parentId && (
                                            <div
                                                className={clsx(
                                                    "p-1 rounded-md mr-1",
                                                    isLinkedToParent
                                                        ? "bg-violet-500/20 text-violet-400 hover:bg-violet-500/30"
                                                        : "hover:bg-violet-500/20 text-zinc-500 hover:text-violet-400"
                                                )}
                                                onClick={handleToggleLink}
                                                title={isLinkedToParent ? "Unlink from parent" : "Link to parent"}
                                            >
                                                {isLinkedToParent ? (
                                                    <Link2Off className="h-4 w-4" />
                                                ) : (
                                                    <Link2 className="h-4 w-4" />
                                                )}
                                            </div>
                                        )}
                                        <div
                                            className="p-1 hover:bg-red-500/20 rounded-md text-zinc-500 hover:text-red-400"
                                            onClick={(e) => onDelete(e, file.id)}
                                            title="Delete file"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </TooltipTrigger>
                    {isCollapsed && (
                        <TooltipContent side="right" className="bg-zinc-900 border-zinc-800 text-white">
                            <p>{file.fileName}</p>
                        </TooltipContent>
                    )}
                </Tooltip>
            </TooltipProvider>
            {!isCollapsed && file.derivedFiles && file.derivedFiles.length > 0 && (
                <div className="flex flex-col pl-4 border-l border-zinc-800 ml-3 my-1 space-y-1">
                    {file.derivedFiles.map(derivedFile => (
                        <DraggableFileItem
                            key={derivedFile.id}
                            file={derivedFile}
                            allFiles={allFiles}
                            isCollapsed={isCollapsed}
                            selectedFileId={selectedFileId}
                            onFileSelect={onFileSelect}
                            onDelete={onDelete}
                            onCreateNote={onCreateNote}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

