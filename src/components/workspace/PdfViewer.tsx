import { useState, useEffect, useCallback, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Search, Loader2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { viewFile } from '@/lib/api';
import { cn } from '@/lib/utils';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
    fileId: string;
    fileName: string;
    isActive: boolean;
}

export function PdfViewer({ fileId, fileName, isActive }: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [fileBlob, setFileBlob] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [fitToWidth, setFitToWidth] = useState(true);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            if (entries[0]) {
                setContainerWidth(entries[0].contentRect.width - 64); // 64px for p-8 (32px each side)
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        async function loadFile() {
            setIsLoading(true);
            try {
                const blob = await viewFile(fileId);
                const url = URL.createObjectURL(blob);
                setFileBlob(url);
            } catch (error) {
                console.error("Failed to load PDF:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadFile();

        return () => {
            if (fileBlob) URL.revokeObjectURL(fileBlob);
        };
    }, [fileId]);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    const changePage = (offset: number) => {
        setPageNumber(prevPageNumber => {
            const newPage = prevPageNumber + offset;
            return Math.min(Math.max(1, newPage), numPages || 1);
        });
    };

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isActive) return;
        if (e.target instanceof HTMLInputElement) return;

        if (e.key === 'ArrowLeft') {
            changePage(-1);
        } else if (e.key === 'ArrowRight') {
            changePage(1);
        }
    }, [numPages, isActive]);

    useEffect(() => {
        if (!isActive) return;
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown, isActive]);

    const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
    const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

    const makeTextRenderer = useCallback((searchText: string) => {
        return (textItem: { str: string }) => {
            if (!searchText) return textItem.str;
            const parts = textItem.str.split(new RegExp(`(${searchText})`, 'gi'));
            return (
                <>
                    {parts.map((part, i) => (
                        part.toLowerCase() === searchText.toLowerCase() ? (
                            <mark key={i} className="bg-yellow-300 text-black">{part}</mark>
                        ) : (
                            <span key={i}>{part}</span>
                        )
                    ))}
                </>
            );
        };
    }, []);

    return (
        <div className="flex flex-col h-full w-full bg-[#0b0b0b] relative">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-2 border-b border-zinc-800 bg-[#111112] z-10 space-x-4">
                <div className="flex items-center space-x-4">
                    <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest truncate max-w-[150px]">
                        {fileName}
                    </span>
                    <div className="h-4 w-[1px] bg-zinc-800" />
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-white"
                            onClick={() => changePage(-1)}
                            disabled={pageNumber <= 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-xs text-zinc-400 font-medium whitespace-nowrap">
                            {pageNumber} / {numPages || '--'}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-white"
                            onClick={() => changePage(1)}
                            disabled={pageNumber >= (numPages || 1)}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 max-w-xs relative group">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-violet-400 transition-colors" />
                    <Input
                        placeholder="Search text..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="h-8 bg-black/40 border-zinc-800 text-xs pl-8 pr-2 focus-visible:ring-violet-600/50"
                    />
                </div>

                <div className="flex items-center space-x-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-8 w-8 text-zinc-400 hover:text-white", fitToWidth && "text-violet-400 bg-violet-400/10")}
                        onClick={() => {
                            setFitToWidth(!fitToWidth);
                            if (!fitToWidth) setScale(1.0);
                        }}
                        title="Fit to Width"
                    >
                        <RotateCcw className={cn("h-4 w-4", fitToWidth ? "rotate-45" : "")} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-zinc-400 hover:text-white"
                        onClick={() => {
                            setFitToWidth(false);
                            zoomOut();
                        }}
                    >
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-zinc-400 hover:text-white"
                        onClick={() => {
                            setFitToWidth(false);
                            zoomIn();
                        }}
                    >
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                    <span className="text-[10px] text-zinc-500 font-mono w-10 text-right">
                        {fitToWidth ? "Auto" : `${Math.round(scale * 100)}%`}
                    </span>
                </div>
            </div>

            {/* Content Area */}
            <div
                className="flex-1 overflow-auto custom-scrollbar scroll-smooth bg-[#060606]"
                ref={containerRef}
            >
                <div className="min-h-full w-full p-8 flex flex-col items-center justify-center">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
                            <p className="text-sm text-zinc-500">Loading PDF...</p>
                        </div>
                    ) : fileBlob ? (
                        <div className="shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-white rounded-sm overflow-hidden transition-all duration-200">
                            <Document
                                file={fileBlob}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={
                                    <div className="p-8 text-zinc-500">Preparing document...</div>
                                }
                                error={
                                    <div className="p-8 text-red-400">Failed to load document</div>
                                }
                            >
                                <Page
                                    pageNumber={pageNumber}
                                    scale={fitToWidth ? 1.0 : scale}
                                    width={fitToWidth ? containerWidth : undefined}
                                    loading={null}
                                    className="pdf-page"
                                    renderTextLayer={true}
                                    renderAnnotationLayer={true}
                                    customTextRenderer={makeTextRenderer(searchText) as any}
                                />
                            </Document>
                        </div>
                    ) : (
                        <div className="text-zinc-500 p-8">Unable to display PDF.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
