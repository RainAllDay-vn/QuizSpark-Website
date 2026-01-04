import { Play, X, Zap } from 'lucide-react';
import { useChatBot } from './ChatBotContext';

interface WorkflowSectionProps {
    onClose: () => void;
    onBack: () => void;
}

export default function WorkflowSection({ onClose, onBack }: WorkflowSectionProps) {
    const { workflows } = useChatBot();

    return (
        <div className="flex flex-col h-full animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800/50 bg-[#0B0F1A]/50">
                <div className="flex items-center gap-2">
                    <button
                        onClick={onBack}
                        className="p-1 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        Workflows
                    </h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Workflow List */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {workflows.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                        <Zap className="w-12 h-12 text-gray-600" />
                        <div>
                            <p className="text-white font-medium">No workflows available</p>
                            <p className="text-sm text-gray-400 mt-1">Workflows will appear here when a compatible component is active</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-3">
                        {workflows.map((workflow) => (
                            <div
                                key={workflow.id}
                                className="group p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl hover:bg-gray-800/50 hover:border-purple-500/30 transition-all cursor-pointer"
                                onClick={() => workflow.run()}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <h3 className="text-white font-medium group-hover:text-purple-400 transition-colors">
                                            {workflow.name}
                                        </h3>
                                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                                            {workflow.description}
                                        </p>
                                    </div>
                                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                        <Play className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800/50 bg-[#0B0F1A]/50 text-center">
                <p className="text-xs text-gray-500">
                    Registered workflows are provided by the current screen context
                </p>
            </div>
        </div>
    );
}
