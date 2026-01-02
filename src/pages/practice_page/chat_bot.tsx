import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardContent, CardHeader } from '@/components/ui/card';
import { X, Send, Bot, User, GripVertical } from 'lucide-react';
import type Message from '@/model/Message';
import MarkdownRenderer from '@/components/custom/markdown-renderer';

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Hello! I\'m your AI assistant. How can I help you with your practice session today?',
      sender: 'BOT',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [width, setWidth] = useState(() => {
    const savedWidth = localStorage.getItem('chatbot-width');
    return savedWidth ? parseInt(savedWidth, 10) : 350;
  });
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('chatbot-width', width.toString());
  }, [width]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

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
      if (newWidth > 280 && newWidth < 800) {
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

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const newUserMessage: Message = {
      text: inputText,
      sender: 'USER',
      timestamp: new Date()
    };
    const payload = [...messages, newUserMessage];

    setMessages(payload);
    setInputText('');
    const initialBotMessage: Message = {
      text: '',
      sender: 'BOT',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, initialBotMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Chat Window */}
      <div
        ref={sidebarRef}
        style={{ width: window.innerWidth < 768 ? '100%' : `${width}px` }}
        className={`fixed right-0 top-0 h-full bg-gray-900/95 backdrop-blur-md border-l border-gray-800 z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'
          } ${isResizing ? 'transition-none' : ''}`}
      >
        {/* Resize Handle */}
        <div
          onMouseDown={startResizing}
          className="absolute left-0 top-0 w-1 h-full cursor-ew-resize hover:bg-purple-500/50 transition-colors z-[60] group flex items-center justify-center"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="h-4 w-4 text-purple-400 -ml-1" />
          </div>
        </div>

        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-gray-800 px-4 py-3 flex flex-row items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-purple-400" />
            <h2 className="text-white font-semibold">AI Assistant</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-800 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        {/* Messages Area */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/50 to-black/50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'USER' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className={`flex items-start space-x-2 max-w-[90%] ${message.sender === 'USER' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'USER'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'bg-gradient-to-r from-cyan-600 to-teal-600'
                  }`}>
                  {message.sender === 'USER' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className={`px-3 py-2 rounded-lg ${message.sender === 'USER'
                  ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/30'
                  : 'bg-gray-800/50 border border-gray-700/50'
                  }`}>
                  <MarkdownRenderer content={message.text} className="text-sm text-white"></MarkdownRenderer>
                  <p className="text-xs text-gray-400 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>

        {/* Input Area */}
        <div className="border-t border-gray-800 p-4 bg-gray-900/50 shrink-0">
          <div className="flex space-x-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
            />
            <Button
              onClick={handleSendMessage}
              disabled={inputText.trim() === ''}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-3"
            >
              <Send className="h-4 w-4" />
            </Button>
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
      `}</style>
    </>
  );
}
