import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageBreakBlockProps {
    pageNumber: number;
    onDelete?: () => void;
    className?: string;
}

export function PageBreakBlock({ pageNumber, onDelete, className }: PageBreakBlockProps) {
    return (
        <div className={cn("group relative py-8 my-4 w-full flex items-center justify-center", className)}>
            {/* Horizontal Line with Gradient */}
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-zinc-800 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent h-[1px]" />
                </div>
            </div>

            {/* Page Badge */}
            <div className="relative flex items-center px-4 bg-[#0b0b0b]">
                <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-xl ring-1 ring-white/5">
                    PAGE {pageNumber}
                </span>
            </div>

            {/* Delete Button */}
            {onDelete && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-rose-500/10 hover:text-rose-500 text-zinc-600 rounded-md"
                    title="Remove Page Break"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}