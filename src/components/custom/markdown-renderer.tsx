import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';
import { memo, useState, useEffect } from "react"; // Import KaTeX styles
import { ImageOff, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const WikiImage = ({ src, alt }: { src: string; alt: string }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displaySrc, setDisplaySrc] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    let isMounted = true;

    const isApiUrl = src.startsWith('/api/v1/files/') || src.includes('/api/v1/files/');

    if (isApiUrl) {
      const fetchImage = async () => {
        setLoading(true);
        try {
          // Extract the path after /api/v1/ if present
          let path = src;
          const apiV1Index = src.indexOf('/api/v1/');
          if (apiV1Index !== -1) {
            path = src.substring(apiV1Index + 7); // Start after "/api/v1"
          }

          const response = await api.get(path, { responseType: 'blob' });
          if (isMounted) {
            objectUrl = URL.createObjectURL(response.data);
            setDisplaySrc(objectUrl);
            setError(false);
          }
        } catch (err) {
          console.error("Failed to load authenticated image:", err);
          if (isMounted) setError(true);
        } finally {
          if (isMounted) setLoading(false);
        }
      };
      fetchImage();
    } else {
      setDisplaySrc(src);
    }

    return () => {
      isMounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-500 space-y-2 my-4">
        <ImageOff className="h-8 w-8 opacity-20" />
        <span className="text-xs font-mono opacity-50 truncate max-w-full px-4">{src}</span>
        <span className="text-[10px] uppercase tracking-wider opacity-30">Image not found</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-500 space-y-2 my-4 animate-pulse">
        <Loader2 className="h-6 w-6 animate-spin opacity-20" />
        <span className="text-[10px] uppercase tracking-wider opacity-30">Loading image...</span>
      </div>
    );
  }

  if (!displaySrc) return null;

  return (
    <img
      src={displaySrc}
      alt={alt}
      onError={() => setError(true)}
      className="rounded-lg border border-zinc-800 my-4 max-w-full"
    />
  );
};

function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  // Simple wikilink image parser: ![[path|alias]] -> ![alias](path)
  const processedContent = content.replace(/!\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g, (_, path, alias) => {
    return `![${alias || path}](${path})`;
  });

  return (
    <div className={`text-md leading-relaxed ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Override default elements to apply Tailwind styles
          p: ({ ...props }) => <p className="mb-3 last:mb-0 text-zinc-300 whitespace-pre-wrap" {...props} />,
          h1: ({ ...props }) => <h1 className="text-3xl font-bold mb-4 text-white tracking-tight" {...props} />,
          h2: ({ ...props }) => <h2 className="text-2xl font-bold mb-3 text-white tracking-tight" {...props} />,
          h3: ({ ...props }) => <h3 className="text-xl font-bold mb-3 text-white tracking-tight" {...props} />,
          h4: ({ ...props }) => <h4 className="text-lg font-bold mb-2 text-white tracking-tight" {...props} />,
          h5: ({ ...props }) => <h5 className="text-base font-bold mb-2 text-white tracking-tight" {...props} />,
          h6: ({ ...props }) => <h6 className="text-sm font-bold mb-2 text-white tracking-tight" {...props} />,
          ul: ({ ...props }) => <ul className="list-disc pl-6 mb-3 space-y-1" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-3 space-y-1" {...props} />,
          li: ({ ...props }) => <li className="text-zinc-300" {...props} />,
          a: ({ ...props }) => <a className="text-violet-400 hover:text-violet-300 transition-colors underline decoration-1 underline-offset-2" target="_blank" rel="noopener noreferrer" {...props} />,
          table: ({ ...props }) => <div className="mb-6 overflow-hidden rounded-lg border border-zinc-800"><table className="w-full border-collapse" {...props} /></div>,
          thead: ({ ...props }) => <thead className="bg-[#0f0f10]" {...props} />,
          tbody: ({ ...props }) => <tbody className="divide-y divide-zinc-800" {...props} />,
          tr: ({ ...props }) => <tr className="hover:bg-[#1a1a1c] transition-colors" {...props} />,
          th: ({ ...props }) => <th className="border border-zinc-800 px-4 py-3 text-left font-semibold text-white" {...props} />,
          td: ({ ...props }) => <td className="border border-zinc-800 px-4 py-3 text-zinc-300" {...props} />,
          code: ({ className, ...props }: any) => {
            const isInline = !className?.includes('language-');
            return isInline
              ? <code className="bg-[#1a1a1c] px-1.5 py-0.5 rounded text-sm font-mono text-violet-400" {...props} />
              : <code className="block bg-[#0f0f10] text-zinc-300 p-4 rounded-md overflow-x-auto font-mono text-sm border border-zinc-800" {...props} />;
          },
          pre: ({ node, ...props }) => <div className="mb-4 rounded-lg overflow-hidden border border-zinc-800 bg-[#0f0f10]"><pre className="p-4 overflow-x-auto" {...props} /></div>,
          br: ({ node, ...props }) => <br className="mb-2" {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-violet-500 pl-4 py-2 my-4 text-zinc-400 italic bg-violet-500/5 rounded-r-md" {...props} />,
          hr: ({ node, ...props }) => <hr className="border-zinc-800 my-6" {...props} />,
          strong: ({ ...props }) => <strong className="text-white font-semibold" {...props} />,
          em: ({ ...props }) => <em className="text-zinc-200" {...props} />,
          img: ({ src, alt }: any) => <WikiImage src={src} alt={alt || ""} />,
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}

export default memo(MarkdownRenderer);
