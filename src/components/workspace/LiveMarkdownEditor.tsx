import { useState, useRef, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import MarkdownRenderer from '@/components/custom/markdown-renderer';
import { cn } from '@/lib/utils';

interface LiveMarkdownEditorProps {
    initialContent: string;
    onSave?: (content: string) => void;
    className?: string;
}

interface Block {
    id: string;
    content: string;
}

export function LiveMarkdownEditor({ initialContent, onSave, className }: LiveMarkdownEditorProps) {
    const [blocks, setBlocks] = useState<Block[]>(() => {
        return groupLinesIntoBlocks(initialContent);
    });

    // Helper to group lines into semantic blocks
    function groupLinesIntoBlocks(text: string): Block[] {
        const lines = text.split('\n');
        const grouped: Block[] = [];
        let currentBlockLines: string[] = [];
        let currentType: 'groupable' | 'standalone' | 'code' | 'empty' | null = null;

        const getLineInfo = (line: string): { type: typeof currentType; isHeaderOrImage?: boolean } => {
            const trimmed = line.trim();
            if (trimmed === '') return { type: 'empty' };
            if (trimmed.startsWith('```')) return { type: 'code' };

            // Standalone types: Headers and Images (including wikilinks)
            if (trimmed.startsWith('#') || trimmed.match(/^!\[/) || trimmed.match(/^!\[\[/)) {
                return { type: 'standalone', isHeaderOrImage: true };
            }

            // Groupable types: Blockquotes, Lists, and regular Text
            // We group these together if they are contiguous to maintain flow
            if (trimmed.startsWith('>') || trimmed.match(/^(\s*)([-*+]|\d+\.)\s/) || true) {
                return { type: 'groupable' };
            }

            return { type: 'groupable' };
        };

        const flush = () => {
            if (currentBlockLines.length > 0) {
                grouped.push({ id: `${Date.now()}-${grouped.length}-${Math.random()}`, content: currentBlockLines.join('\n') });
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
                grouped.push({ id: `${Date.now()}-${grouped.length}-empty-${Math.random()}`, content: '' });
                currentType = null;
            } else if (type === 'standalone') {
                flush();
                grouped.push({ id: `${Date.now()}-${grouped.length}-standalone-${Math.random()}`, content: line });
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
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const newBlock: Block = {
                id: `${Date.now()}-${Math.random()}`,
                content: ''
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

    return (
        <div className={cn("flex flex-col w-full h-full bg-[#0b0b0b] text-zinc-300 font-sans overflow-auto custom-scrollbar", className)}>
            <div className="max-w-4xl mx-auto w-full py-12 px-8 min-h-full">
                {blocks.map((block, index) => (
                    <div
                        key={block.id}
                        className={cn(
                            "group relative min-h-[1.5rem] py-0.5 px-2 -mx-2 rounded-sm cursor-text transition-colors",
                            editingIndex === index ? "bg-violet-500/5 ring-1 ring-violet-500/20" : "hover:bg-zinc-800/30"
                        )}
                        onClick={() => handleBlockClick(index)}
                    >
                        {editingIndex === index ? (
                            <TextareaAutosize
                                ref={textareaRef}
                                value={block.content}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onBlur={handleBlur}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-full bg-transparent border-none outline-none resize-none p-0 m-0 text-inherit font-mono leading-relaxed focus:ring-0 placeholder-zinc-700"
                                placeholder="Type '/' for commands..."
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
                ))}
                {/* Clickable area at the bottom to add new block */}
                <div
                    className="flex-1 min-h-[200px] cursor-text"
                    onClick={() => {
                        if (blocks[blocks.length - 1].content.trim() !== '') {
                            const newBlock: Block = { id: `${Date.now()}-end`, content: '' };
                            setBlocks([...blocks, newBlock]);
                            setEditingIndex(blocks.length);
                        } else {
                            setEditingIndex(blocks.length - 1);
                        }
                    }}
                />
            </div>
        </div>
    );
}
