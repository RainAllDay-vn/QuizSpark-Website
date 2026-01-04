import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Bot, Plus, History, X, ImageIcon, Loader2, ChevronLeft, Send, Brain, Zap } from 'lucide-react';
import MarkdownRenderer from '@/components/custom/markdown-renderer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { viewFile } from '@/lib/api';
import { User, MoreVertical as LucideMoreVertical, Check, Copy as LucideCopy } from 'lucide-react';
import type ChatFileDTO from '@/dtos/ChatFileDTO';
import type ChatMessageDTO from '@/dtos/ChatMessageDTO';
import type ChatModelDTO from '@/dtos/ChatModelDTO';

export interface UiChatMessage extends ChatMessageDTO {
    files?: ChatFileDTO[];
}

const ChatAttachment = ({ fileId }: { fileId: string }) => {
    const [src, setSrc] = React.useState<string | null>(null);

    React.useEffect(() => {
        let active = true;
        const fetchImage = async () => {
            try {
                const blob = await viewFile(fileId);
                if (active) {
                    const url = URL.createObjectURL(blob);
                    setSrc(url);
                }
            } catch (error) {
                console.error("Failed to load attachment image", error);
            }
        };
        fetchImage();
        return () => {
            active = false;
            if (src) URL.revokeObjectURL(src);
        };
    }, [fileId]);

    if (!src) return <div className="w-full h-32 bg-gray-800/50 animate-pulse rounded-lg" />;

    return (
        <img
            src={src}
            alt="Attachment"
            className="w-full h-auto object-cover max-h-64"
        />
    );
};

const LocalFilePreview = ({ file, onRemove }: { file: File, onRemove: () => void }) => {
    const [preview, setPreview] = React.useState<string | null>(null);

    React.useEffect(() => {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    if (!preview) return <div className="w-16 h-16 bg-gray-800/50 rounded-xl animate-pulse" />;

    return (
        <div className="relative group">
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-700/50 bg-black/20">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <button
                onClick={onRemove}
                className="absolute -top-1.5 -right-1.5 bg-[#111827] text-gray-400 border border-gray-700 rounded-full p-0.5 opacity-100 shadow-sm hover:text-white hover:border-gray-500 transition-all"
            >
                <X className="w-3 h-3" />
            </button>
        </div>
    );
};

const ContextChip = ({ onRemove }: { onRemove: () => void }) => {
    return (
        <div className="flex items-center gap-2 px-2.5 py-1.5 bg-gray-900/50 border border-gray-800/80 rounded-lg animate-fade-in group transition-all hover:border-gray-700/50">
            <Brain className="w-3.5 h-3.5 text-purple-400" />
            <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-gray-300 font-medium">Current Screen</span>
                <span className="text-[10px] text-gray-500">(Context)</span>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
                className="ml-1 p-0.5 text-gray-500 hover:text-rose-400 transition-colors"
            >
                <X className="w-3 h-3" />
            </button>
        </div>
    );
};

interface ChatSectionProps {
    messages: UiChatMessage[];
    inputText: string;
    setInputText: (text: string) => void;
    isContextEnabled: boolean;
    setIsContextEnabled: (enabled: boolean) => void;
    hasContext: boolean;
    onSendMessage: (index?: number) => void;
    onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedFiles: File[];
    onRemoveFile: (index: number) => void;
    isUploading: boolean;
    isStreaming: boolean;
    selectedModel: ChatModelDTO | undefined;
    setSelectedModelId: (id: string) => void;
    availableModels: ChatModelDTO[];
    onOpenHistory: () => void;
    onOpenWorkflows: () => void;
    onNewChat: () => void;
    onClose: () => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export default function ChatSection({
    messages,
    inputText,
    setInputText,
    isContextEnabled,
    setIsContextEnabled,
    hasContext,
    onSendMessage,
    onFileUpload,
    selectedFiles,
    onRemoveFile,
    isUploading,
    isStreaming,
    selectedModel,
    setSelectedModelId,
    availableModels,
    onOpenHistory,
    onOpenWorkflows,
    onNewChat,
    onClose,
    fileInputRef
}: ChatSectionProps) {
    const [copiedId, setCopiedId] = React.useState<string | null>(null);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
        }
    }, [inputText]);

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSendMessage();
        }
    };

    const handleCopy = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const renderMessageHeader = (msg: UiChatMessage) => (
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${msg.role === 'USER'
                    ? 'bg-purple-600'
                    : 'bg-cyan-600'
                    }`}>
                    {msg.role === 'USER' ? <User className="h-3 w-3 text-white" /> : <Bot className="h-3 w-3 text-white" />}
                </div>
                <span className="text-xs font-medium text-gray-300">
                    {msg.role === 'USER' ? 'User' : 'AI Assistant'}
                </span>
            </div>
            {msg.role === 'USER' && (
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-500 hover:text-white">
                    <LucideMoreVertical className="h-3 w-3" />
                </Button>
            )}
        </div>
    );

    const renderMessageFooter = (msg: UiChatMessage) => {
        if (msg.role === 'USER') return null;

        return (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800/50">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-7 text-[10px] text-gray-400 hover:text-white capitalize">
                            {msg.model || selectedModel?.displayName || 'Unknown Model'}
                            <ChevronLeft className="h-3 w-3 ml-1 rotate-270" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="bg-gray-800 border-gray-700 text-white">
                        {availableModels.map(m => (
                            <DropdownMenuItem key={m.id} onClick={() => setSelectedModelId(m.id)} className="text-xs">
                                {m.displayName}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center space-x-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSendMessage(msg.messageIndex)}
                        disabled={isStreaming}
                        className="h-7 w-7 p-0 text-gray-400 hover:text-white"
                    >
                        <History className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="h-7 w-7 p-0 text-gray-400 hover:text-white"
                    >
                        {copiedId === msg.id ? <Check className="h-3.5 w-3.5 text-green-500" /> : <LucideCopy className="h-3.5 w-3.5" />}
                    </Button>
                </div>
            </div>
        );
    };

    const getFileSrc = (file: { id?: string, data?: string, fileType?: string }) => {
        // If it has data, use it (Base64)
        if (file.data && file.fileType) return `data:${file.fileType};base64,${file.data}`;
        if (file.data) return `data:image/jpeg;base64,${file.data}`; // Fallback assume image
        return '';
    };

    return (
        <div className="flex-1 flex flex-col h-full animate-fade-in overflow-hidden">
            {/* Header */}
            <header className="h-16 border-b border-gray-800/50 px-4 flex items-center justify-end shrink-0 bg-white/5">
                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onNewChat}
                        className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                    >
                        <Plus className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onOpenWorkflows}
                        className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                    >
                        <Zap className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onOpenHistory}
                        className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                    >
                        <History className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-hide">
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center opacity-40 text-center px-8">
                        <Bot className="h-10 w-10 mb-3 text-purple-400" />
                        <p className="text-white text-sm">How can I help you today?</p>
                        <p className="text-xs mt-1">Start a new conversation or pick one from history.</p>
                    </div>
                )}
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex animate-fade-in ${message.role === 'USER' ? 'justify-end' : 'justify-start'}`}
                    >
                        <Card className={`w-full max-w-[98%] py-1 gap-1 border-gray-800/40 transition-all duration-300 hover:border-purple-500/20 ${message.role === 'USER'
                            ? 'bg-purple-900/5'
                            : 'bg-white/[0.01]'
                            }`}>
                            <CardHeader className="px-3 pt-1 pb-0 space-y-0">
                                {renderMessageHeader(message)}
                            </CardHeader>
                            <CardContent className="px-3 pt-1 pb-0">
                                {(message.files && message.files.length > 0) || (message.fileIds && message.fileIds.length > 0) ? (
                                    <div className="mb-2 flex flex-wrap gap-2">
                                        {message.files && message.files.map((file, idx) => (
                                            <div key={`file-${idx}`} className="rounded-lg overflow-hidden border border-gray-800 max-w-sm">
                                                {file.id && !file.data ? (
                                                    <ChatAttachment fileId={file.id} />
                                                ) : (
                                                    <img
                                                        src={getFileSrc(file)}
                                                        alt={file.fileName || "Attachment"}
                                                        className="w-full h-auto object-cover max-h-64"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                        {message.fileIds && message.fileIds.map((fileId, idx) => (
                                            <div key={`id-${idx}`} className="rounded-lg overflow-hidden border border-gray-800 max-w-sm">
                                                <ChatAttachment fileId={fileId} />
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                                <MarkdownRenderer
                                    content={message.content}
                                    className="text-[13px] text-gray-200 leading-relaxed prose prose-invert max-w-none"
                                />
                            </CardContent>
                            <CardFooter className="px-3 pt-0 pb-1 block">
                                {renderMessageFooter(message)}
                                <div className="text-[9px] text-gray-600 mt-1 text-right">
                                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
                {isStreaming && messages[messages.length - 1]?.role !== 'ASSISTANT' && (
                    <div className="flex justify-start animate-pulse">
                        <Card className="bg-white/[0.02] border-gray-800/50 w-24 h-8 flex items-center justify-center">
                            <Loader2 className="h-3 w-3 text-purple-400 animate-spin" />
                        </Card>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="pb-2 shrink-0 px-3">
                <Card className="gap-0 py-0 bg-[#111827]/90 border-gray-800/60 backdrop-blur-2xl shadow-2xl overflow-hidden rounded-xl">
                    {(selectedFiles.length > 0 || (isContextEnabled && hasContext)) && (
                        <div className="px-3 pt-3 pb-1 flex flex-wrap gap-2 animate-fade-in border-b border-gray-800/30 mb-1">
                            {isContextEnabled && hasContext && (
                                <ContextChip onRemove={() => setIsContextEnabled(false)} />
                            )}
                            {selectedFiles.map((file, idx) => (
                                <LocalFilePreview
                                    key={`${file.name}-${file.lastModified}-${idx}`}
                                    file={file}
                                    onRemove={() => onRemoveFile(idx)}
                                />
                            ))}
                        </div>
                    )}
                    <div className="px-2 py-1">
                        {/* Textarea Box */}
                        <div className="border border-gray-700/60 rounded-lg bg-gray-900/40 focus-within:border-purple-500/40 focus-within:ring-1 focus-within:ring-purple-500/10 transition-all duration-200">
                            <textarea
                                ref={textareaRef}
                                value={inputText}
                                onChange={(e) => {
                                    setInputText(e.target.value);
                                }}
                                onKeyDown={handleKeyPress}
                                placeholder="Ask anything..."
                                rows={1}
                                className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 resize-none p-3 pr-5 text-sm min-h-[44px] max-h-[150px] leading-relaxed custom-scrollbar text-area-fix"
                                style={{ height: 'auto', colorScheme: 'dark' }}
                            />
                        </div>

                        {/* Bottom Actions */}
                        <div className="flex items-center justify-between mt-2.5 px-0.5">
                            <div className="flex items-center space-x-3">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center space-x-1 text-[11px] text-gray-400 hover:text-gray-200 transition-colors bg-gray-800/30 px-2 py-1 rounded-md border border-gray-800/40">
                                            <span className="font-medium">{selectedModel?.displayName || 'Loading...'}</span>
                                            <div className="flex items-center space-x-1 ml-1 scale-75">
                                                {selectedModel?.characteristics.includes('VISION') && <ImageIcon className="h-3 w-3 text-cyan-400" />}
                                                {selectedModel?.characteristics.includes('REASONING') && <Brain className="h-3 w-3 text-purple-400" />}
                                            </div>
                                            <ChevronLeft className="h-2.5 w-2.5 rotate-270 opacity-40" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start" className="bg-gray-900 border-gray-800 text-gray-300 min-w-[200px]">
                                        {availableModels.map(m => (
                                            <DropdownMenuItem key={m.id} onClick={() => setSelectedModelId(m.id)} className="text-xs flex items-center justify-between hover:bg-gray-800 focus:bg-gray-800 focus:text-white py-2">
                                                <span>{m.displayName}</span>
                                                <div className="flex items-center space-x-1.5 opacity-60">
                                                    {m.characteristics.includes('VISION') && <ImageIcon className="h-3 w-3" />}
                                                    {m.characteristics.includes('REASONING') && <Brain className="h-3 w-3" />}
                                                </div>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <div className="flex items-center space-x-0.5">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={onFileUpload}
                                        className="hidden"
                                        accept="image/*"
                                        multiple // Enable multiple file selection
                                    />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isUploading || isStreaming}
                                        className={`h-8 w-8 p-0 transition-all duration-200 rounded-md ${selectedFiles.length > 0 ? 'text-purple-400 bg-purple-400/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                    >
                                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-3.5 w-3.5" />}
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" className="bg-gray-900 border-gray-800 text-gray-300 min-w-[200px]">
                                            {hasContext ? (
                                                <DropdownMenuItem
                                                    onClick={() => setIsContextEnabled(!isContextEnabled)}
                                                    className="text-xs flex items-center justify-between hover:bg-gray-800 focus:bg-gray-800 focus:text-white py-2 cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Brain className={cn("h-3.5 w-3.5", isContextEnabled ? "text-purple-400" : "text-gray-500")} />
                                                        <span>Include Current Screen</span>
                                                    </div>
                                                    {isContextEnabled && <Check className="h-3 w-3 text-purple-400" />}
                                                </DropdownMenuItem>
                                            ) : (
                                                <div className="px-3 py-2 text-[10px] text-gray-500 italic flex items-center gap-2">
                                                    <Brain className="h-3 w-3 opacity-30" />
                                                    <span>No context available on this page</span>
                                                </div>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button
                                    onClick={() => onSendMessage()}
                                    disabled={(inputText.trim() === '' && selectedFiles.length === 0) || isStreaming}
                                    className="h-9 w-9 p-0 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-400 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg active:scale-95 disabled:grayscale disabled:opacity-30"
                                >
                                    <Send className="h-4 w-4 text-white" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
                <div className="mt-2 flex items-center justify-center space-x-2 text-[9px] text-gray-400 select-none opacity-80">
                    <span className="bg-white/10 px-1.5 py-0.5 rounded border border-white/10 font-bold text-white/90 tracking-tight">Enter</span>
                    <span>to send</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="bg-white/10 px-1.5 py-0.5 rounded border border-white/10 font-bold text-white/90 tracking-tight">Shift+Enter</span>
                    <span>for new line</span>
                </div>
            </div>
        </div>
    );
}
