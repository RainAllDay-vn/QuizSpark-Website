import { Button } from '@/components/ui/button';
import { ChevronLeft, Plus, History, X } from 'lucide-react';
import type ChatSessionDTO from '@/dtos/ChatSessionDTO';

interface HistorySectionProps {
    sessions: ChatSessionDTO[];
    currentSessionId: string | null;
    onSelectSession: (sessionId: string) => void;
    onNewChat: () => void;
    onBack: () => void;
    onClose: () => void;
}

export default function HistorySection({
    sessions,
    currentSessionId,
    onSelectSession,
    onNewChat,
    onBack,
    onClose
}: HistorySectionProps) {
    return (
        <div className="flex-1 flex flex-col bg-[#0B0F1A]/95 h-full animate-fade-in">
            {/* Header */}
            <header className="h-16 border-b border-gray-800/50 px-4 flex items-center justify-between shrink-0 bg-white/5">
                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                        className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <span className="text-sm font-medium text-gray-200">History</span>
                </div>
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
                        onClick={onClose}
                        className="text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            </header>

            {/* Session List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {sessions.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-40 text-center px-8">
                        <History className="h-10 w-10 mb-3 text-purple-400" />
                        <p className="text-white text-sm">No history yet</p>
                    </div>
                ) : (
                    sessions.map(session => (
                        <button
                            key={session.id}
                            onClick={() => onSelectSession(session.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${currentSessionId === session.id
                                ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30'
                                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent'
                                }`}
                        >
                            <div className="truncate font-medium">{session.title || 'Untitled Chat'}</div>
                            <div className="text-[10px] opacity-50 mt-1 flex items-center justify-between">
                                <span>{new Date(session.createdAt).toLocaleDateString()}</span>
                                <span>{new Date(session.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </button>
                    ))
                )}
            </div>

            {/* Footer / New Chat Shortcut */}
            <div className="p-4 border-t border-gray-800/50">
                <Button
                    onClick={onNewChat}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-10 font-medium transition-all"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Start New Chat
                </Button>
            </div>
        </div>
    );
}
