import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, Card, CardFooter } from '@/components/ui/card';
import { X, Send, Bot, User, GripVertical, Plus, History, Image as ImageIcon, ChevronLeft, ChevronRight, MoreVertical, Loader2 } from 'lucide-react';
import MarkdownRenderer from '@/components/custom/markdown-renderer';
import {
  getChatSessions,
  getSessionMessages,
  streamChat,
  uploadChatAttachment,
  getChatAttachmentUrl
} from '@/lib/api';
import type ChatMessageDTO from '@/dtos/ChatMessageDTO';
import type ChatSessionDTO from '@/dtos/ChatSessionDTO';
import type ChatResponseDTO from '@/dtos/ChatResponseDTO';
import type ChatRequestDTO from '@/dtos/ChatRequestDTO';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const MODELS = ["deepseek-v3", "deepseek-r1", "gpt-4o", "gemini-1.5-pro"];

export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [sessions, setSessions] = useState<ChatSessionDTO[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessageDTO[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [uploadedFileId, setUploadedFileId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [width, setWidth] = useState(() => {
    const savedWidth = localStorage.getItem('chatbot-width');
    return savedWidth ? parseInt(savedWidth, 10) : 450; // Increased default width for cards
  });
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [inputText]);

  useEffect(() => {
    localStorage.setItem('chatbot-width', width.toString());
  }, [width]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      loadSessions();
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    setShowSessions(false);
  };

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setShowSessions(false);
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
      model: selectedModel,
      createdAt: new Date().toISOString()
    };

    if (index !== undefined) {
      // Reroll logic: remove messages after index
      setMessages(prev => [...prev.slice(0, index), initialBotMessage]);
    } else {
      setMessages(prev => [...prev, initialBotMessage]);
    }

    try {
      const request: ChatRequestDTO = {
        message: messageContent,
        sessionId: currentSessionId || undefined,
        model: selectedModel,
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessageHeader = (msg: ChatMessageDTO) => (
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
        {msg.role === 'ASSISTANT' && (
          <>
            <div className="px-1.5 py-0.5 rounded bg-blue-500/20 border border-blue-500/30 text-[10px] text-blue-400">
              Tools
            </div>
            <div className="px-1.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/30 text-[10px] text-purple-400">
              Context
            </div>
          </>
        )}
      </div>
      {msg.role === 'USER' && (
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-500 hover:text-white">
          <MoreVertical className="h-3 w-3" />
        </Button>
      )}
    </div>
  );

  const renderMessageFooter = (msg: ChatMessageDTO) => {
    if (msg.role === 'USER') return null;

    return (
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800/50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 text-[10px] text-gray-400 hover:text-white capitalize">
              {msg.model || selectedModel}
              <ChevronLeft className="h-3 w-3 ml-1 rotate-270" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-gray-800 border-gray-700 text-white">
            {MODELS.map(m => (
              <DropdownMenuItem key={m} onClick={() => setSelectedModel(m)} className="text-xs">
                {m}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSendMessage(msg.messageIndex)}
            disabled={isStreaming}
            className="h-7 w-7 p-0 text-gray-400 hover:text-white"
          >
            <History className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-white">
            <ImageIcon className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-white">
            <Bot className="h-3.5 w-3.5" />
          </Button>
          <div className="flex items-center ml-2 border-l border-gray-800 pl-2">
            <Button variant="ghost" size="sm" className="h-7 w-5 p-0 text-gray-400 hover:text-white">
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <span className="text-[10px] text-gray-500 px-1">1/1</span>
            <Button variant="ghost" size="sm" className="h-7 w-5 p-0 text-gray-400 hover:text-white">
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[4px] z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Chat Window */}
      <div
        ref={sidebarRef}
        style={{ width: window.innerWidth < 768 ? '100%' : `${width}px` }}
        className={`fixed right-0 top-0 h-full bg-[#0B0F1A]/95 backdrop-blur-xl border-l border-gray-800/50 z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'
          } ${isResizing ? 'transition-none' : ''}`}
      >
        {/* Resize Handle */}
        <div
          onMouseDown={startResizing}
          className="absolute left-0 top-0 w-1.5 h-full cursor-ew-resize hover:bg-purple-500/50 transition-colors z-[60] group flex items-center justify-center"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="h-4 w-4 text-purple-400 -ml-1" />
          </div>
        </div>

        {/* Sessions Sidebar (Overlay) */}
        {showSessions && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-[70] flex animate-fade-in">
            <div className="w-64 h-full bg-[#111827] border-r border-gray-800 p-4 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold">History</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowSessions(false)} className="h-8 w-8 p-0 text-gray-400">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2">
                {sessions.map(session => (
                  <button
                    key={session.id}
                    onClick={() => handleSelectSession(session.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentSessionId === session.id
                      ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                      }`}
                  >
                    <div className="truncate font-medium">{session.title || 'Untitled Chat'}</div>
                    <div className="text-[10px] opacity-50 mt-1">
                      {new Date(session.createdAt).toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1" onClick={() => setShowSessions(false)} />
          </div>
        )}

        {/* Header */}
        <header className="h-16 border-b border-gray-800/50 px-4 flex items-center justify-end shrink-0 bg-white/5">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNewChat}
              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSessions(true)}
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
              <Card className={`w-full max-w-[98%] border-gray-800/40 transition-all duration-300 hover:border-purple-500/20 ${message.role === 'USER'
                ? 'bg-purple-900/5'
                : 'bg-white/[0.01]'
                }`}>
                <CardHeader className="p-2.5 pb-0 space-y-0">
                  {renderMessageHeader(message)}
                </CardHeader>
                <CardContent className="p-2.5 pt-1">
                  {message.fileId && (
                    <div className="mb-2 rounded-lg overflow-hidden border border-gray-800 max-w-sm">
                      <img
                        src={getChatAttachmentUrl(message.fileId)}
                        alt="Attachment"
                        className="w-full h-auto object-cover max-h-64"
                      />
                    </div>
                  )}
                  <MarkdownRenderer
                    content={message.content}
                    className="text-[13px] text-gray-200 leading-relaxed prose prose-invert max-w-none"
                  />
                </CardContent>
                <CardFooter className="p-2.5 pt-0 block">
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
        <div className="pb-2 shrink-0">
          <Card className="gap-0 py-0 bg-[#111827]/90 border-gray-800/60 backdrop-blur-2xl shadow-2xl overflow-hidden rounded-xl">
            {/* Context bar */}
            <div className="px-2 py-1 flex flex-wrap gap-1.5">
              <div className="flex items-center space-x-1 px-1.5 py-0.5 bg-gray-800/40 border border-gray-700/40 rounded text-[9px] text-gray-400 group/tag cursor-default hover:bg-gray-800/60 transition-colors">
                <ImageIcon className="h-2.5 w-2.5 opacity-40" />
                <span>Practice Context</span>
                <X className="h-2.5 w-2.5 ml-0.5 cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>

            <div className="px-2 py-1">
              {/* Textarea Box */}
              <div className="border border-gray-700/60 rounded-lg bg-gray-900/40 focus-within:border-purple-500/40 focus-within:ring-1 focus-within:ring-purple-500/10 transition-all duration-200">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    if (textareaRef.current) {
                      textareaRef.current.style.height = 'auto';
                      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
                    }
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
                        <span className="font-medium">{selectedModel}</span>
                        <ChevronLeft className="h-2.5 w-2.5 rotate-270 opacity-40" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="bg-gray-900 border-gray-800 text-gray-300">
                      {MODELS.map(m => (
                        <DropdownMenuItem key={m} onClick={() => setSelectedModel(m)} className="text-[11px] hover:bg-gray-800 focus:bg-gray-800 focus:text-white">
                          {m}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="flex items-center space-x-0.5">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                      accept="image/*"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading || isStreaming}
                      className={`h-8 w-8 p-0 transition-all duration-200 rounded-md ${uploadedFileId ? 'text-purple-400 bg-purple-400/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                      {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-3.5 w-3.5" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="hidden sm:flex items-center space-x-1 text-gray-500 mr-1 group cursor-pointer hover:text-gray-400 transition-colors">
                    <ChevronLeft className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100" />
                    <span className="text-[9px] font-medium tracking-wide">Vault Chat</span>
                    <ChevronRight className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100" />
                  </div>
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={(inputText.trim() === '' && !uploadedFileId) || isStreaming}
                    className="h-9 w-9 p-0 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-400 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg active:scale-95 disabled:grayscale disabled:opacity-30"
                  >
                    <Send className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          <div className="mt-2 flex items-center justify-center space-x-1.5 text-[9px] text-gray-500 select-none opacity-40">
            <span className="bg-gray-800/50 px-1 py-0.5 rounded border border-gray-700/30 font-bold">Enter</span>
            <span>to send</span>
            <span className="w-1 h-1 rounded-full bg-gray-800" />
            <span className="bg-gray-800/50 px-1 py-0.5 rounded border border-gray-700/30 font-bold">Shift+Enter</span>
            <span>for new line</span>
          </div>
        </div>
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
        /* Hide scrollbar buttons (arrows) */
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
