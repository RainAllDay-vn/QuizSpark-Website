import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GripVertical } from 'lucide-react';
import {
    getChatSessions,
    getSessionMessages,
    streamChat,
    uploadChatAttachment,
    getChatModels
} from '@/lib/api';
import type ChatMessageDTO from '@/dtos/ChatMessageDTO';
import type ChatSessionDTO from '@/dtos/ChatSessionDTO';
import type ChatResponseDTO from '@/dtos/ChatResponseDTO';
import type ChatRequestDTO from '@/dtos/ChatRequestDTO';
import type ChatModelDTO from '@/dtos/ChatModelDTO';

import ChatSection from './ChatSection';
import HistorySection from './HistorySection';

interface ChatBotProps {
    isOpen: boolean;
    onClose: () => void;
}

type ChatView = 'chat' | 'history';

export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
    const [sessions, setSessions] = useState<ChatSessionDTO[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessageDTO[]>([]);
    const [inputText, setInputText] = useState('');
    const [availableModels, setAvailableModels] = useState<ChatModelDTO[]>([]);
    const [selectedModelId, setSelectedModelId] = useState(() => {
        return localStorage.getItem('chatbot-selected-model-id') || '';
    });
    const selectedModel = availableModels.find(m => m.id === selectedModelId) || availableModels[0];

    const [uploadedFileId, setUploadedFileId] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [currentView, setCurrentView] = useState<ChatView>('chat');
    const [isAnimating, setIsAnimating] = useState(false);
    const [width, setWidth] = useState(() => {
        const savedWidth = localStorage.getItem('chatbot-width');
        return savedWidth ? parseInt(savedWidth, 10) : 450;
    });
    const [isResizing, setIsResizing] = useState(false);

    const sidebarRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);



    useEffect(() => {
        localStorage.setItem('chatbot-width', width.toString());
    }, [width]);

    useEffect(() => {
        loadModels();
    }, []);

    useEffect(() => {
        if (selectedModelId) {
            localStorage.setItem('chatbot-selected-model-id', selectedModelId);
        }
    }, [selectedModelId]);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            loadSessions();
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]);



    const loadModels = async () => {
        try {
            const data = await getChatModels();
            setAvailableModels(data);
            if (!selectedModelId && data.length > 0) {
                setSelectedModelId(data[0].id);
            }
        } catch (error) {
            console.error("Failed to load models:", error);
        }
    };

    const loadSessions = async () => {
        try {
            const data = await getChatSessions();
            setSessions(data);
        } catch (error) {
            console.error("Failed to load sessions:", error);
        }
    };

    const loadMessages = async (sessionId: string) => {
        try {
            const data = await getSessionMessages(sessionId);
            setMessages(data);
        } catch (error) {
            console.error("Failed to load messages:", error);
        }
    };

    const handleSelectSession = (sessionId: string) => {
        setCurrentSessionId(sessionId);
        loadMessages(sessionId);
        setCurrentView('chat');
    };

    const handleNewChat = () => {
        setCurrentSessionId(null);
        setMessages([]);
        setCurrentView('chat');
    };

    const startResizing = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback((e: MouseEvent) => {
        if (isResizing) {
            const newWidth = window.innerWidth - e.clientX;
            if (newWidth > 350 && newWidth < 800) {
                setWidth(newWidth);
            }
        }
    }, [isResizing]);

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResizing);
        } else {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        }
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [isResizing, resize, stopResizing]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const fileId = await uploadChatAttachment(file);
            setUploadedFileId(fileId);
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSendMessage = async (index?: number) => {
        if (inputText.trim() === '' && !uploadedFileId && index === undefined) return;

        const messageContent = inputText;
        setInputText('');

        let newUserMessage: ChatMessageDTO | null = null;
        if (index === undefined) {
            newUserMessage = {
                id: crypto.randomUUID(),
                role: 'USER',
                content: messageContent,
                messageIndex: messages.length,
                fileId: uploadedFileId,
                createdAt: new Date().toISOString()
            };
            setMessages(prev => [...prev, newUserMessage!]);
        }

        setUploadedFileId(null);
        setIsStreaming(true);

        const botMessageId = crypto.randomUUID();
        const initialBotMessage: ChatMessageDTO = {
            id: botMessageId,
            role: 'ASSISTANT',
            content: '',
            messageIndex: index !== undefined ? index : messages.length + 1,
            model: selectedModel?.displayName || 'Unknown Model',
            createdAt: new Date().toISOString()
        };

        if (index !== undefined) {
            setMessages(prev => [...prev.slice(0, index), initialBotMessage]);
        } else {
            setMessages(prev => [...prev, initialBotMessage]);
        }

        try {
            const request: ChatRequestDTO = {
                message: messageContent,
                sessionId: currentSessionId || undefined,
                model: selectedModel?.name,
                fileId: newUserMessage?.fileId || undefined,
                index: index
            };

            await streamChat(request, (chunk: ChatResponseDTO) => {
                if (chunk.sessionId && !currentSessionId) {
                    setCurrentSessionId(chunk.sessionId);
                    loadSessions();
                }

                if (chunk.status === 'data' && chunk.chunk) {
                    setMessages(prev => prev.map(msg =>
                        msg.id === botMessageId
                            ? { ...msg, content: msg.content + chunk.chunk }
                            : msg
                    ));
                }

                if (chunk.status === 'finish') {
                    setIsStreaming(false);
                }
            });
        } catch (error) {
            console.error("Streaming failed", error);
            setIsStreaming(false);
        }
    };



    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-[4px] z-40 transition-opacity duration-300"
                onClick={onClose}
            />

            <div
                ref={sidebarRef}
                style={{ width: window.innerWidth < 768 ? '100%' : `${width}px` }}
                className={`fixed right-0 top-0 h-full bg-[#0B0F1A]/95 backdrop-blur-xl border-l border-gray-800/50 z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'
                    } ${isResizing ? 'transition-none' : ''}`}
            >
                <div
                    onMouseDown={startResizing}
                    className="absolute left-0 top-0 w-1.5 h-full cursor-ew-resize hover:bg-purple-500/50 transition-colors z-[60] group flex items-center justify-center"
                >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <GripVertical className="h-4 w-4 text-purple-400 -ml-1" />
                    </div>
                </div>

                {currentView === 'chat' ? (
                    <ChatSection
                        messages={messages}
                        inputText={inputText}
                        setInputText={setInputText}
                        onSendMessage={handleSendMessage}
                        onFileUpload={handleFileUpload}
                        isUploading={isUploading}
                        isStreaming={isStreaming}
                        selectedModel={selectedModel}
                        setSelectedModelId={setSelectedModelId}
                        availableModels={availableModels}
                        uploadedFileId={uploadedFileId}
                        onOpenHistory={() => setCurrentView('history')}
                        onNewChat={handleNewChat}
                        onClose={onClose}
                        fileInputRef={fileInputRef}
                    />
                ) : (
                    <HistorySection
                        sessions={sessions}
                        currentSessionId={currentSessionId}
                        onSelectSession={handleSelectSession}
                        onNewChat={handleNewChat}
                        onBack={() => setCurrentView('chat')}
                        onClose={onClose}
                    />
                )}
            </div>

            <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #374151 transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }
        .custom-scrollbar::-webkit-scrollbar-button {
          display: none !important;
          height: 0 !important;
          width: 0 !important;
        }
        .custom-scrollbar::-webkit-scrollbar-corner {
          background: transparent !important;
        }
      `}</style>
        </>
    );
}
