import { useState, useEffect, useCallback, useRef } from 'react';
import { Document, Page, pdfjs, type PageProps } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Search, Loader2, RotateCcw, List } from 'lucide-react';
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
    onPageChange?: (page: number) => void;
    externalPage?: number;
}

interface PageWithObserverProps {
    pageNumber: number;
    scale: number;
    width?: number;
    onVisible: () => void;
    makeTextRenderer: (searchText: string) => (textItem: { str: string }) => string | React.ReactNode;
    searchText: string;
}

function PageWithObserver({
    pageNumber,
    scale,
    width,
    onVisible,
    makeTextRenderer,
    searchText
}: PageWithObserverProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const visibilityObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onVisible();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '-40% 0px -40% 0px'
            }
        );

        const loadObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                rootMargin: '200% 0px' // Load pages when they are within 2 viewports distance
            }
        );

        if (ref.current) {
            visibilityObserver.observe(ref.current);
            loadObserver.observe(ref.current);
        }

        return () => {
            visibilityObserver.disconnect();
            loadObserver.disconnect();
        };
    }, [onVisible]);

    return (
        <div ref={ref} className="min-h-[500px] flex items-center justify-center bg-white">
            {isVisible ? (
                <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    width={width}
                    loading={<div className="h-[842px] w-full flex items-center justify-center bg-zinc-50 border border-zinc-100" />}
                    className="pdf-page bg-white"
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    customTextRenderer={makeTextRenderer(searchText) as PageProps['customTextRenderer']}
                />
            ) : (
                <div
                    className="bg-zinc-50 border border-zinc-100 animate-pulse"
                    style={{ width: width || '595px', height: (width ? width * 1.414 : 842) + 'px' }}
                />
            )}
        </div>
    );
}

export function PdfViewer({ fileId, fileName, isActive, onPageChange, externalPage }: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [fileBlob, setFileBlob] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [fitToWidth, setFitToWidth] = useState(true);
    const [viewMode, setViewMode] = useState<'single' | 'scroll'>('single');

    const containerRef = useRef<HTMLDivElement>(null);
    const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isExternalUpdateRef = useRef(false);
    const lastExternalPageRef = useRef<number | undefined>(externalPage);

    // Callbacks defined first so they can be used in effects
    const changePage = useCallback((offset: number) => {
        const newPage = Math.min(Math.max(1, pageNumber + offset), numPages || 1);
        setPageNumber(newPage);
        if (viewMode === 'scroll') {
            const element = document.getElementById(`pdf-page-${newPage}`);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [pageNumber, numPages, viewMode]);

    const goToPage = useCallback((page: number) => {
        const newPage = Math.min(Math.max(1, page), numPages || 1);
        setPageNumber(newPage);
        if (viewMode === 'scroll') {
            const element = document.getElementById(`pdf-page-${newPage}`);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [numPages, viewMode]);

    useEffect(() => {
        if (externalPage !== undefined) {
             // If the external page has changed, update our tracker
             // This prevents "stale" props from resetting user navigation
            if (externalPage !== lastExternalPageRef.current) {
                lastExternalPageRef.current = externalPage;
                
                // Only sync if strictly different
                if (externalPage !== pageNumber) {
                    isExternalUpdateRef.current = true;
                    goToPage(externalPage);
                }
            } else if (externalPage !== pageNumber) {
                // External matches last known, but pageNumber differs.
                // This means USER navigated locally.
                // We do NOT sync back to externalPage here, allowing the user to move freely.
                // The parent will eventually be updated via onPageChange.
            }
        }
    }, [externalPage, goToPage, pageNumber]);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            if (entries[0]) {
                if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
                resizeTimeoutRef.current = setTimeout(() => {
                    setContainerWidth(entries[0].contentRect.width - 64); // 64px for p-8 (32px each side)
                }, 100);
            }
        });

        observer.observe(containerRef.current);
        return () => {
            observer.disconnect();
            if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
        };
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
    }, [fileBlob, fileId]);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        // If we have an external page waiting, jump to it immediately upon load
        setPageNumber(externalPage || 1);
    };

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isActive) return;
        if (e.target instanceof HTMLInputElement) return;

        if (e.key === 'ArrowLeft') {
            changePage(-1);
        } else if (e.key === 'ArrowRight') {
            changePage(1);
        }
    }, [isActive, changePage]);

    useEffect(() => {
        if (!isActive) return;
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown, isActive]);

    useEffect(() => {
        if (isExternalUpdateRef.current) {
            isExternalUpdateRef.current = false;
            return;
        }
        onPageChange?.(pageNumber);
    }, [pageNumber, onPageChange]);

    // Ensure current page is visible when switching to scroll mode
    useEffect(() => {
        if (viewMode === 'scroll') {
            // Use a small timeout to ensure the DOM has rendered the page containers
            const timer = setTimeout(() => {
                const element = document.getElementById(`pdf-page-${pageNumber}`);
                element?.scrollIntoView({ behavior: 'auto', block: 'start' });
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [pageNumber, viewMode]);

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
                            <input
                                type="text"
                                value={pageNumber}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (!isNaN(val)) goToPage(val);
                                }}
                                className="w-8 bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-violet-500 rounded"
                            />
                             / {numPages || '--'}
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
                        className={cn("h-8 w-8 text-zinc-400 hover:text-white", viewMode === 'scroll' && "text-violet-400 bg-violet-400/10")}
                        onClick={() => setViewMode(viewMode === 'single' ? 'scroll' : 'single')}
                        title={viewMode === 'single' ? "Switch to Scroll Mode" : "Switch to Single Page"}
                    >
                        <List className="h-4 w-4" />
                    </Button>
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
                        <div className={cn("bg-transparent rounded-sm transition-all duration-200", viewMode === 'single' ? "shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-white" : "w-full")}>
                            <Document
                                file={fileBlob}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={
                                    <div className="p-8 text-zinc-500 text-center w-full">Preparing document...</div>
                                }
                                error={
                                    <div className="p-8 text-red-400 text-center w-full">Failed to load document</div>
                                }
                                className={viewMode === 'scroll' ? 'flex flex-col items-center gap-8' : ''}
                            >
                                {viewMode === 'single' ? (
                                    <Page
                                        pageNumber={pageNumber}
                                        scale={fitToWidth ? 1.0 : scale}
                                        width={fitToWidth ? containerWidth : undefined}
                                        loading={null}
                                        className="pdf-page bg-white shadow-lg"
                                        renderTextLayer={true}
                                        renderAnnotationLayer={true}
                                        customTextRenderer={makeTextRenderer(searchText) as unknown as PageProps['customTextRenderer']}
                                    />
                                ) : (
                                    Array.from(new Array(numPages), (_el, index) => (
                                        <div
                                            key={`page_${index + 1}`}
                                            id={`pdf-page-${index + 1}`}
                                            data-page={index + 1}
                                            className="pdf-page-container bg-white shadow-lg"
                                        >
                                            <PageWithObserver
                                                pageNumber={index + 1}
                                                scale={fitToWidth ? 1.0 : scale}
                                                width={fitToWidth ? containerWidth : undefined}
                                                onVisible={() => setPageNumber(index + 1)}
                                                makeTextRenderer={makeTextRenderer}
                                                searchText={searchText}
                                            />
                                        </div>
                                    ))
                                )}
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
