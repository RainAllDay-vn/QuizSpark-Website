import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { viewFile, downloadFile } from "@/lib/api";
import type { DbFile } from "@/model/DbFile";
import MarkdownRenderer from "@/components/custom/markdown-renderer";

interface FilePreviewDialogProps {
    isOpen: boolean;
    onClose: () => void;
    file: DbFile | null;
    headerActions?: React.ReactNode;
}

export default function FilePreviewDialog({ isOpen, onClose, file, headerActions }: FilePreviewDialogProps) {
    const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
    const [textPreview, setTextPreview] = useState<string | null>(null);
    const [fileType, setFileType] = useState<'pdf' | 'image' | 'text' | 'markdown' | null>(null);
    const [isLoadingPreview, setIsLoadingPreview] = useState(false);

    useEffect(() => {
        if (isOpen && file) {
            const lowerName = file.fileName.toLowerCase();
            const lowerType = file.fileType.toLowerCase();

            let type: 'pdf' | 'image' | 'text' | 'markdown' | null = null;

            if (lowerType.includes('pdf') || lowerName.endsWith('.pdf')) {
                type = 'pdf';
            } else if (lowerType.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|svg)$/.test(lowerName)) {
                type = 'image';
            } else if (lowerName.endsWith('.md') || lowerName.endsWith('.markdown')) {
                type = 'markdown';
            } else if (lowerType.startsWith('text/') || lowerName.endsWith('.txt')) {
                type = 'text';
            }

            setFileType(type);

            if (type) {
                setIsLoadingPreview(true);
                viewFile(file.id)
                    .then(async (blob) => {
                        if (type === 'pdf' || type === 'image') {
                            const url = URL.createObjectURL(blob);
                            setFilePreviewUrl(url);
                            setTextPreview(null);
                        } else if (type === 'text' || type === 'markdown') {
                            const text = await blob.text();
                            setTextPreview(text);
                            setFilePreviewUrl(null);
                        }
                    })
                    .catch(error => {
                        console.error("Failed to load file preview", error);
                        setFileType(null);
                    })
                    .finally(() => {
                        setIsLoadingPreview(false);
                    });
            } else {
                setFilePreviewUrl(null);
                setTextPreview(null);
            }
        } else {
            // Cleanup when dialog closes or file changes
            cleanup();
        }

        return () => cleanup();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, file]);

    const cleanup = () => {
        if (filePreviewUrl) {
            URL.revokeObjectURL(filePreviewUrl);
        }
        setFilePreviewUrl(null);
        setTextPreview(null);
        setFileType(null);
        setIsLoadingPreview(false);
    };

    const handleDownloadFile = async () => {
        if (!file) return;
        try {
            await downloadFile(file.id);
        } catch (error) {
            console.error("Failed to download file", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="bg-[#151518] border-zinc-800 text-white max-w-5xl h-[90vh] flex flex-col p-0">
                <DialogHeader className="pl-6 pr-10 py-4 border-b border-zinc-800 flex flex-row items-center justify-between space-y-0">
                    <DialogTitle className="truncate pr-4">{file?.fileName}</DialogTitle>
                    <div className="flex items-center gap-2">
                        {headerActions}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDownloadFile}
                            className="border-zinc-700 text-zinc-300 bg-transparent hover:bg-zinc-800"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </Button>
                    </div>
                </DialogHeader>
                <div className="flex-1 bg-[#0f0f10] w-full h-full overflow-hidden flex items-center justify-center relative">
                    {isLoadingPreview ? (
                        <div className="flex flex-col items-center justify-center text-zinc-400">
                            <Loader2 className="w-8 h-8 animate-spin mb-2" />
                            <p>Loading preview...</p>
                        </div>
                    ) : fileType === 'pdf' && filePreviewUrl ? (
                        <iframe
                            src={filePreviewUrl}
                            className="w-full h-full border-none"
                            title="File Preview"
                        />
                    ) : fileType === 'image' && filePreviewUrl ? (
                        <img
                            src={filePreviewUrl}
                            alt={file?.fileName}
                            className="max-w-full max-h-full object-contain p-4"
                        />
                    ) : fileType === 'markdown' && textPreview ? (
                        <div className="w-full h-full overflow-y-auto p-8 prose prose-invert max-w-none">
                            <MarkdownRenderer content={textPreview} />
                        </div>
                    ) : fileType === 'text' && textPreview ? (
                        <div className="w-full h-full overflow-y-auto p-6">
                            <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-300 bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                                {textPreview}
                            </pre>
                        </div>
                    ) : (
                        <div className="text-center p-8 text-zinc-400">
                            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <h3 className="text-lg font-medium text-white mb-2">Preview not available</h3>
                            <p className="max-w-md mx-auto mb-6">
                                This file type cannot be previewed in the browser.
                                Please download the file to view it.
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
