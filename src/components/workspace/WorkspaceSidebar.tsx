import { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { Search, Loader2, FileText, Upload, ChevronLeft, ChevronRight, File as FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { DbFile } from '@/model/DbFile';
import { uploadFileIndependent } from '@/lib/api';
import { ScrollArea } from '../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import clsx from 'clsx';

interface WorkspaceSidebarProps {
    files: DbFile[];
    isLoading: boolean;
    onFileSelect: (file: DbFile) => void;
    onUpload?: () => void;
    selectedFileId?: string;
}

export function WorkspaceSidebar({ files, isLoading, onFileSelect, onUpload, selectedFileId }: WorkspaceSidebarProps) {
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
            <ScrollArea className="flex-1 px-2 py-4">
                <div className="space-y-1">
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="w-5 h-5 animate-spin text-zinc-600" />
                        </div>
                    ) : (
                        filteredFiles.map((file) => <DraggableFileItem key={file.id} file={file} isCollapsed={isCollapsed} selectedFileId={selectedFileId} onFileSelect={onFileSelect} />)
                    )}
                </div>
            </ScrollArea>
        </aside>
    );
}
function DraggableFileItem({ file, isCollapsed, selectedFileId, onFileSelect }: { file: DbFile, isCollapsed: boolean, selectedFileId?: string, onFileSelect: (file: DbFile) => void }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'FILE',
        item: { type: 'FILE', file },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [file]);

    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        ref={drag as any}
                        onClick={() => onFileSelect(file)}
                        className={clsx(
                            "flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-[#1a1a1c] hover:text-white cursor-pointer group",
                            isCollapsed ? "justify-center px-2" : "",
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
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium truncate">{file.fileName}</p>
                                <p className="text-[10px] text-zinc-500 truncate">{new Date(file.uploadDate).toLocaleDateString()}</p>
                            </div>
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
    );
}

