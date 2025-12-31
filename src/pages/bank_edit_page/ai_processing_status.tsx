import { Bot, FileText } from 'lucide-react';

interface Props {
    stage: string;
}

export default function AiProcessingStatus({ stage }: Props) {
    switch (stage) {
        case 'analyzing':
            return (
                <div className="flex flex-col items-center justify-center animate-in fade-in duration-500">
                    <div className="relative w-16 h-16 mb-2">
                        <FileText className="w-16 h-16 text-zinc-700" />
                        <div className="absolute left-0 right-0 h-0.5 bg-violet-500 shadow-[0_0_8px_2px_rgba(139,92,246,0.6)] animate-[scan_2s_ease-in-out_infinite]"
                            style={{ animation: 'scan 2s ease-in-out infinite' }} />
                    </div>
                    <style>{`
            @keyframes scan {
              0%, 100% { top: 10%; }
              50% { top: 80%; }
            }
          `}</style>
                    <p className="mt-4 text-violet-300 font-medium animate-pulse">Analyzing Document...</p>
                    <p className="text-zinc-500 text-sm mt-1">Extracting content and structure</p>
                </div>
            );

        default:
            return (
                <div className="flex flex-col items-center justify-center animate-in fade-in duration-500">
                    <div className="relative">
                        <div className="bg-violet-500/20 p-4 rounded-full animate-bounce">
                            <Bot className="w-12 h-12 text-violet-400" />
                        </div>
                        <div className="absolute -top-1 -right-1">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
                            </span>
                        </div>
                    </div>
                    <p className="mt-4 text-violet-300 font-medium animate-pulse">Processing...</p>
                    <p className="text-zinc-500 text-sm mt-1">The AI is analyzing your document</p>
                </div>
            );
    }
}
