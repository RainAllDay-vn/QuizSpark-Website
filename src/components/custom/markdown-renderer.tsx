import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';
import {memo} from "react"; // Import KaTeX styles

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`text-md leading-relaxed ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Override default elements to apply Tailwind styles
          p: ({...props}) => <p className="mb-3 last:mb-0 text-zinc-300 whitespace-pre-wrap" {...props} />,
          h1: ({...props}) => <h1 className="text-3xl font-bold mb-4 text-white tracking-tight" {...props} />,
          h2: ({...props}) => <h2 className="text-2xl font-bold mb-3 text-white tracking-tight" {...props} />,
          h3: ({...props}) => <h3 className="text-xl font-bold mb-3 text-white tracking-tight" {...props} />,
          h4: ({...props}) => <h4 className="text-lg font-bold mb-2 text-white tracking-tight" {...props} />,
          h5: ({...props}) => <h5 className="text-base font-bold mb-2 text-white tracking-tight" {...props} />,
          h6: ({...props}) => <h6 className="text-sm font-bold mb-2 text-white tracking-tight" {...props} />,
          ul: ({...props}) => <ul className="list-disc pl-6 mb-3 space-y-1" {...props} />,
          ol: ({...props}) => <ol className="list-decimal pl-6 mb-3 space-y-1" {...props} />,
          li: ({...props}) => <li className="text-zinc-300" {...props} />,
          a: ({...props}) => <a className="text-violet-400 hover:text-violet-300 transition-colors underline decoration-1 underline-offset-2" target="_blank" rel="noopener noreferrer" {...props} />,
          table: ({...props}) => <div className="mb-6 overflow-hidden rounded-lg border border-zinc-800"><table className="w-full border-collapse" {...props} /></div>,
          thead: ({...props}) => <thead className="bg-[#0f0f10]" {...props} />,
          tbody: ({...props}) => <tbody className="divide-y divide-zinc-800" {...props} />,
          tr: ({...props}) => <tr className="hover:bg-[#1a1a1c] transition-colors" {...props} />,
          th: ({...props}) => <th className="border border-zinc-800 px-4 py-3 text-left font-semibold text-white" {...props} />,
          td: ({...props}) => <td className="border border-zinc-800 px-4 py-3 text-zinc-300" {...props} />,
          code: ({className, ...props}: any) => {
            const isInline = !className?.includes('language-');
            return isInline
              ? <code className="bg-[#1a1a1c] px-1.5 py-0.5 rounded text-sm font-mono text-violet-400" {...props} />
              : <code className="block bg-[#0f0f10] text-zinc-300 p-4 rounded-md overflow-x-auto font-mono text-sm border border-zinc-800" {...props} />;
          },
          pre: ({...props}) => <div className="mb-4 rounded-lg overflow-hidden border border-zinc-800 bg-[#0f0f10]"><pre className="p-4 overflow-x-auto" {...props} /></div>,
          br: ({...props}) => <br className="mb-2" {...props} />,
          blockquote: ({...props}) => <blockquote className="border-l-4 border-violet-500 pl-4 py-2 my-4 text-zinc-400 italic" {...props} />,
          hr: ({...props}) => <hr className="border-zinc-800 my-6" {...props} />,
          strong: ({...props}) => <strong className="text-white font-semibold" {...props} />,
          em: ({...props}) => <em className="text-zinc-200" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default memo(MarkdownRenderer);
