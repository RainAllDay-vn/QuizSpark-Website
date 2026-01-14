import { useState, useRef, useEffect, useMemo } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import MarkdownRenderer from '@/components/custom/markdown-renderer';
import { cn } from '@/lib/utils';
import { PageBreakBlock } from './PageBreakBlock';

interface LiveMarkdownEditorProps {
    initialContent: string;
    onSave?: (content: string) => void;
    className?: string;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    viewMode?: 'scroll' | 'page';
}

interface Block {
    id: string;
    content: string;
    type: 'content' | 'pagebreak';
}

export function LiveMarkdownEditor({ initialContent, onSave, className, currentPage, onPageChange, viewMode = 'scroll' }: LiveMarkdownEditorProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
    const isScrollingRef = useRef(false);

    const [blocks, setBlocks] = useState<Block[]>(() => {
        return groupLinesIntoBlocks(initialContent);
    });

    // Calculate page numbers for the blocks
    const blockPageNumbers = useMemo(() => {
        let pageCounter = 1;
        const numbers: number[] = [];
        blocks.forEach((block) => {
            if (block.type === 'pagebreak') {
                pageCounter++;
                numbers.push(pageCounter);
            } else {
                numbers.push(pageCounter);
            }
        });
        return numbers;
    }, [blocks]);

    // Helper to group lines into semantic blocks
    function groupLinesIntoBlocks(text: string): Block[] {
        const lines = text.split('\n');
        const grouped: Block[] = [];
        let currentBlockLines: string[] = [];
        let currentType: 'groupable' | 'standalone' | 'code' | 'empty' | 'pagebreak' | null = null;

        const getLineInfo = (line: string): { type: typeof currentType; isHeaderOrImage?: boolean } => {
            const trimmed = line.trim();
            if (trimmed === '') return { type: 'empty' };
            if (trimmed.startsWith('```')) return { type: 'code' };

            // Page Break
            if (trimmed === '---') return { type: 'pagebreak' };

            // Standalone types: Headers and Images (including wikilinks)
            if (trimmed.startsWith('#') || trimmed.match(/^!\[/) || trimmed.match(/^!\[\[/)) {
                return { type: 'standalone', isHeaderOrImage: true };
            }

            // Groupable types: Blockquotes, Lists, and regular Text
            // We group these together if they are contiguous to maintain flow
            return { type: 'groupable' };
        };

        const flush = () => {
            if (currentBlockLines.length > 0) {
                grouped.push({
                    id: `${Date.now()}-${grouped.length}-${Math.random()}`,
                    content: currentBlockLines.join('\n'),
                    type: 'content'
                });
                currentBlockLines = [];
            }
        };

        lines.forEach((line) => {
            const { type } = getLineInfo(line);

            // Special case for code blocks: they continue until the closing backticks
            if (currentType === 'code') {
                currentBlockLines.push(line);
                if (line.trim().startsWith('```')) {
                    flush();
                    currentType = null;
                }
                return;
            }

            if (type === 'empty') {
                flush();
                grouped.push({ id: `${Date.now()}-${grouped.length}-empty-${Math.random()}`, content: '', type: 'content' });
                currentType = null;
            } else if (type === 'pagebreak') {
                flush();
                grouped.push({ id: `${Date.now()}-${grouped.length}-page-break-${Math.random()}`, content: '---', type: 'pagebreak' });
                currentType = null;
            } else if (type === 'standalone') {
                flush();
                grouped.push({ id: `${Date.now()}-${grouped.length}-standalone-${Math.random()}`, content: line, type: 'content' });
                currentType = null;
            } else if (type === 'code') {
                flush();
                currentBlockLines = [line];
                currentType = 'code';
            } else {
                // Groupable: check if we are already in a groupable block
                if (currentType !== 'groupable') {
                    flush();
                    currentType = 'groupable';
                }
                currentBlockLines.push(line);
            }
        });

        flush();
        return grouped;
    }
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Track scroll to update current page - ONLY IN SCROLL MODE
    useEffect(() => {
        if (viewMode === 'page') return;

        const container = containerRef.current;
        if (!container || !onPageChange || isScrollingRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (isScrollingRef.current) return;

                // Find the entry that is most visible or top-most
                const visibleEntries = entries.filter(e => e.isIntersecting);
                if (visibleEntries.length === 0) return;

                // Sort by top position
                visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                
                const topMost = visibleEntries[0];
                const pageNum = parseInt(topMost.target.getAttribute('data-page') || '1');
                
                if (pageNum !== currentPage) {
                    onPageChange(pageNum);
                }
            },
            {
                root: container,
                threshold: [0, 0.1, 0.5, 1.0],
                rootMargin: '-10% 0px -80% 0px' // Focus on the top part of the viewport
            }
        );

        const currentBlocks = blockRefs.current;
        currentBlocks.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [onPageChange, blocks, currentPage, viewMode]);

    // Handle external page changes (scrolling to the page) - ONLY IN SCROLL MODE
    useEffect(() => {
        if (viewMode === 'page') return;

        if (currentPage !== undefined && !isScrollingRef.current) {
            // Find the first block that belongs to this page
            const targetIndex = blockPageNumbers.findIndex(p => p === currentPage);
            if (targetIndex !== -1) {
                const targetElement = blockRefs.current[targetIndex];
                if (targetElement && containerRef.current) {
                    isScrollingRef.current = true;
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // Reset the flag after animation
                    setTimeout(() => {
                        isScrollingRef.current = false;
                    }, 1000);
                }
            }
        }
    }, [blockPageNumbers, currentPage, viewMode]);

    // Auto-focus the textarea when entering editing mode
    useEffect(() => {
        if (editingIndex !== null && textareaRef.current) {
            textareaRef.current.focus();
            // Move cursor to end
            const length = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(length, length);
        }
    }, [editingIndex]);

    const handleBlockClick = (index: number) => {
        setEditingIndex(index);
    };

    const handleBlur = () => {
        setEditingIndex(null);
        if (onSave) {
            onSave(blocks.map(b => b.content).join('\n'));
        }
    };

    const handleChange = (index: number, newContent: string) => {
        const newBlocks = [...blocks];
        newBlocks[index].content = newContent;
        setBlocks(newBlocks);

        // Trigger onSave while typing
        if (onSave) {
            onSave(newBlocks.map(b => b.content).join('\n'));
        }
    };

    const deletePageBreak = (index: number) => {
        const newBlocks = [...blocks];
        newBlocks.splice(index, 1);
        setBlocks(newBlocks);
        if (onSave) {
            onSave(newBlocks.map(b => b.content).join('\n'));
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            const currentContent = blocks[index].content.trim();
            if (currentContent === '---') {
                e.preventDefault();
                const newBlocks = [...blocks];
                // Convert current block to pagebreak
                newBlocks[index].type = 'pagebreak';
                newBlocks[index].content = '---';
                // Add new empty block after
                const newBlock: Block = {
                    id: `${Date.now()}-${Math.random()}`,
                    content: '',
                    type: 'content'
                };
                newBlocks.splice(index + 1, 0, newBlock);
                setBlocks(newBlocks);
                setEditingIndex(index + 1);
                return;
            }

            e.preventDefault();
            const newBlock: Block = {
                id: `${Date.now()}-${Math.random()}`,
                content: '',
                type: 'content'
            };
            const newBlocks = [...blocks];
            newBlocks.splice(index + 1, 0, newBlock);
            setBlocks(newBlocks);
            setEditingIndex(index + 1);
        } else if (e.key === 'Backspace' && blocks[index].content === '' && blocks.length > 1) {
            e.preventDefault();
            const newBlocks = [...blocks];
            newBlocks.splice(index, 1);
            setBlocks(newBlocks);
            setEditingIndex(index > 0 ? index - 1 : 0);
        } else if (e.key === 'ArrowUp' && index > 0 && textareaRef.current?.selectionStart === 0) {
            e.preventDefault();
            setEditingIndex(index - 1);
        } else if (e.key === 'ArrowDown' && index < blocks.length - 1 && textareaRef.current?.selectionEnd === blocks[index].content.length) {
            e.preventDefault();
            setEditingIndex(index + 1);
        }
    };

    // Get blocks for current page - Filter if viewMode is 'page'
    const getDisplayBlocks = () => {
        if (viewMode === 'scroll' || currentPage === undefined) {
            return blocks.map((block, index) => ({ block, originalIndex: index }));
        }

        const result: { block: Block; originalIndex: number }[] = [];
        let currentPageCounter = 1;

        blocks.forEach((block, index) => {
            if (block.type === 'pagebreak') {
                if (currentPageCounter === currentPage) {
                    result.push({ block, originalIndex: index });
                }
                currentPageCounter++; // Move to next page after this break
            } else {
                if (currentPageCounter === currentPage) {
                    result.push({ block, originalIndex: index });
                }
            }
        });
        
        return result;
    };

    const displayBlocks = getDisplayBlocks();

    return (
        <div
            ref={containerRef}
            className={cn("flex flex-col w-full h-full bg-[#0b0b0b] text-zinc-300 font-sans overflow-auto custom-scrollbar", className)}
        >
            <div className="max-w-4xl mx-auto w-full py-12 px-8 min-h-full">
                {displayBlocks.map(({ block, originalIndex }) => (
                    <div
                        key={block.id}
                        ref={el => { blockRefs.current[originalIndex] = el; }}
                        data-page={blockPageNumbers[originalIndex]}
                    >
                        {block.type === 'pagebreak' ? (
                            <PageBreakBlock
                                pageNumber={blockPageNumbers[originalIndex]}
                                onDelete={() => deletePageBreak(originalIndex)}
                            />
                        ) : (
                            <div
                                className={cn(
                                    "group relative min-h-[1.5rem] py-0.5 px-2 -mx-2 rounded-sm cursor-text transition-colors",
                                    editingIndex === originalIndex ? "bg-violet-500/5 ring-1 ring-violet-500/20" : "hover:bg-zinc-800/30"
                                )}
                                onClick={() => handleBlockClick(originalIndex)}
                            >
                                {editingIndex === originalIndex ? (
                                    <TextareaAutosize
                                        ref={textareaRef}
                                        value={block.content}
                                        onChange={(e) => handleChange(originalIndex, e.target.value)}
                                        onBlur={handleBlur}
                                        onKeyDown={(e) => handleKeyDown(e, originalIndex)}
                                        className="w-full bg-transparent border-none outline-none resize-none p-0 m-0 text-inherit font-mono leading-relaxed focus:ring-0 placeholder-zinc-700"
                                        placeholder="Type '/' for commands..."
                                        autoFocus
                                    />
                                ) : (
                                    <div className="w-full">
                                        {block.content.trim() === '' ? (
                                            <div className="h-6 w-full" />
                                        ) : (
                                            <MarkdownRenderer content={block.content} className="p-0 m-0" />
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
                
                {/* Clickable area at the bottom to add new block */
                 /* Only show this if we are in scroll mode OR if we are on the very last page in page mode */}
                {((viewMode === 'scroll') || (viewMode === 'page' && currentPage === blockPageNumbers[blockPageNumbers.length - 1])) && (
                    <div
                        className="flex-1 min-h-[200px] cursor-text"
                        onClick={() => {
                            const lastIndex = blocks.length - 1;
                            const lastBlock = blocks[lastIndex];
                            
                            // If last block has content or is a pagebreak, add new block
                            if (lastBlock.content.trim() !== '' || lastBlock.type === 'pagebreak') {
                                const newBlock: Block = { id: `${Date.now()}-end`, content: '', type: 'content' };
                                const newBlocks = [...blocks];
                                newBlocks.push(newBlock);
                                setBlocks(newBlocks);
                                setEditingIndex(blocks.length); // Index of new block
                                if (onSave) onSave(newBlocks.map(b => b.content).join('\n'));
                            } else {
                                // Just focus the existing last empty block
                                setEditingIndex(lastIndex);
                            }
                        }}
                    />
                )}
            </div>
        </div>
    );
}
