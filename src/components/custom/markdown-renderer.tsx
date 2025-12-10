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
          p: ({...props}) => <p className="mb-2 last:mb-0" {...props} />,
          ul: ({...props}) => <ul className="list-disc pl-5 mb-2" {...props} />,
          ol: ({...props}) => <ol className="list-decimal pl-5 mb-2" {...props} />,
          a: ({...props}) => <a className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default memo(MarkdownRenderer);
