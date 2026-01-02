import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Download, Trash2, Loader2, Search, Library } from 'lucide-react';
import { getUserFiles, viewFile, downloadFile, deleteFilePermanent } from '@/lib/api';
import type { DbFile } from '@/model/DbFile';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function LibrarySection() {
    const [files, setFiles] = useState<DbFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // File Preview State
    const [selectedFile, setSelectedFile] = useState<DbFile | null>(null);
    const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
    const [isLoadingPreview, setIsLoadingPreview] = useState(false);

    useEffect(() => {
        loadFiles();
    }, []);

    const loadFiles = async () => {
        setIsLoading(true);
        try {
            const data = await getUserFiles();
            setFiles(data);
        } catch (error) {
            console.error("Failed to fetch files:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteFile = async (fileId: string) => {
        if (!window.confirm("Are you sure you want to permanently delete this file? This will remove it from all question banks it is assigned to.")) return;
        try {
            await deleteFilePermanent(fileId);
            setFiles(prev => prev.filter(f => f.id !== fileId));
            if (selectedFile?.id === fileId) {
                handleClosePreview();
            }
        } catch (error) {
            console.error("Failed to delete file:", error);
            alert("Failed to delete file");
        }
    };

    const handleFileClick = async (file: DbFile) => {
        setSelectedFile(file);

        // Only fetch content for PDFs
        if (file.fileType.includes('pdf') || file.fileName.toLowerCase().endsWith('.pdf')) {
            setIsLoadingPreview(true);
            try {
                const blob = await viewFile(file.id);
                const url = URL.createObjectURL(blob);
                setFilePreviewUrl(url);
            } catch (error) {
                console.error("Failed to load file preview", error);
            } finally {
                setIsLoadingPreview(false);
            }
        } else {
            setFilePreviewUrl(null);
        }
    };

    const handleClosePreview = () => {
        if (filePreviewUrl) {
            URL.revokeObjectURL(filePreviewUrl);
        }
        setFilePreviewUrl(null);
        setSelectedFile(null);
    };

    const handleDownloadFile = async (file: DbFile) => {
        try {
            await downloadFile(file.id, file.fileName);
        } catch (error) {
            console.error("Failed to download file", error);
        }
    };

    const getFileStyle = (fileName: string, fileType: string) => {
        const normalizeType = fileType?.toLowerCase() || '';
        const normalizeName = fileName?.toLowerCase() || '';

        if (normalizeType.includes('pdf') || normalizeName.endsWith('.pdf')) {
            return 'bg-pink-950/40 border-pink-800 text-pink-200';
        }
        if (normalizeType.includes('word') || normalizeType.includes('document') || normalizeName.endsWith('.doc') || normalizeName.endsWith('.docx')) {
            return 'bg-blue-950/40 border-blue-800 text-blue-200';
        }
        return 'bg-zinc-800 border-zinc-700 text-zinc-300';
    };

    const filteredFiles = files.filter(file =>
        file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1 flex items-center gap-2">
                        <Library className="w-8 h-8 text-violet-500" />
                        My Library
                    </h1>
                    <p className="text-zinc-400">Manage all your uploaded study materials.</p>
                </div>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input
                        placeholder="Search files..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-[#151518] border-zinc-700 text-white focus-visible:ring-violet-600"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                    <Loader2 className="w-10 h-10 animate-spin mb-4 text-violet-600" />
                    <p className="text-lg">Loading your library...</p>
                </div>
            ) : filteredFiles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredFiles.map((file) => (
                        <div
                            key={file.id}
                            onClick={() => handleFileClick(file)}
                            className={`group relative flex flex-col p-4 rounded-xl border cursor-pointer hover:scale-[1.02] transition-all duration-200 ${getFileStyle(file.fileName, file.fileType)} shadow-lg shadow-black/20`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 rounded-lg bg-black/20 group-hover:bg-black/40 transition-colors">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 hover:bg-black/20"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDownloadFile(file);
                                        }}
                                    >
                                        <Download className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 hover:bg-red-900/40 hover:text-red-400"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteFile(file.id);
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <h3 className="font-semibold text-sm truncate pr-2" title={file.fileName}>
                                    {file.fileName}
                                </h3>
                                <p className="text-[10px] uppercase tracking-wider opacity-60 mt-1">
                                    Uploaded on {new Date(file.uploadDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-[#0f0f10] border border-dashed border-zinc-800 rounded-2xl text-center px-4">
                    <div className="p-4 rounded-full bg-zinc-900 mb-4">
                        <Library className="w-12 h-12 text-zinc-700" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">
                        {searchQuery ? "No matching files found" : "Your library is empty"}
                    </h3>
                    <p className="text-zinc-500 max-w-sm">
                        {searchQuery
                            ? `We couldn't find any documents matching "${searchQuery}".`
                            : "Upload documents to your question banks to see them here in your central library."}
                    </p>
                    {searchQuery && (
                        <Button
                            variant="link"
                            className="mt-2 text-violet-400"
                            onClick={() => setSearchQuery("")}
                        >
                            Clear search
                        </Button>
                    )}
                </div>
            )}

            {/* File Preview Dialog */}
            <Dialog open={!!selectedFile} onOpenChange={(open) => !open && handleClosePreview()}>
                <DialogContent className="bg-[#151518] border-zinc-800 text-white max-w-5xl h-[90vh] flex flex-col p-0 overflow-hidden shadow-2xl">
                    <DialogHeader className="px-6 py-4 border-b border-zinc-800 flex flex-row items-center justify-between space-y-0 bg-[#1a1a1c]">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="p-2 rounded bg-violet-600/20">
                                <FileText className="w-5 h-5 text-violet-400" />
                            </div>
                            <DialogTitle className="truncate text-lg font-medium">{selectedFile?.fileName}</DialogTitle>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => selectedFile && handleDownloadFile(selectedFile)}
                                className="border-zinc-700 text-zinc-300 bg-transparent hover:bg-zinc-800 hover:text-white transition-colors"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => selectedFile && handleDeleteFile(selectedFile.id)}
                                className="border-red-900/50 text-red-400 bg-transparent hover:bg-red-900/20 hover:text-red-300 transition-colors"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                    </DialogHeader>

                    <div className="flex-1 bg-[#0b0b0b] w-full h-full overflow-hidden flex items-center justify-center relative">
                        {isLoadingPreview ? (
                            <div className="flex flex-col items-center justify-center text-zinc-400">
                                <Loader2 className="w-10 h-10 animate-spin mb-4 text-violet-600" />
                                <p className="text-lg animate-pulse">Loading preview...</p>
                            </div>
                        ) : filePreviewUrl ? (
                            <iframe
                                src={filePreviewUrl}
                                className="w-full h-full border-none"
                                title="File Preview"
                            />
                        ) : (
                            <div className="text-center p-12 bg-[#0f0f10] rounded-2xl border border-zinc-800 shadow-xl max-w-md">
                                <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FileText className="w-10 h-10 text-zinc-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">Preview Not Available</h3>
                                <p className="text-zinc-400 mb-8 leading-relaxed">
                                    We can't show a live preview of this file type just yet. You can still download it to view locally.
                                </p>
                                <Button
                                    className="w-full bg-violet-600 hover:bg-violet-700 text-white h-12 text-base shadow-lg shadow-violet-900/20"
                                    onClick={() => selectedFile && handleDownloadFile(selectedFile)}
                                >
                                    <Download className="w-5 h-5 mr-3" />
                                    Download to View
                                </Button>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
