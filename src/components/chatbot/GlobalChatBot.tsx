import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAuthStatus from '@/lib/use_auth_hook';
import ChatBot from './ChatBot';

export default function GlobalChatBot() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { user, loading } = useAuthStatus();
    const location = useLocation();

    const allowedPaths = [
        '/home',
        '/bank/',
        '/edit/bank/',
        '/practice/',
        '/workspace'
    ];

    if (loading) return null;

    const isVisible = allowedPaths.some(path => location.pathname.startsWith(path)) && user?.role === 'ROLE_ADMIN';

    if (!isVisible) return null;

    return (
        <>
            {/* Chat Bot Button */}
            {!isChatOpen && (
                <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-[100]"
                    aria-label="Toggle chat bot"
                >
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2-2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                </button>
            )}

            {/* Chat Bot Component */}
            <ChatBot
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
            />
        </>
    );
}
