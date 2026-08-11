import { isValidElement, useState } from "react";
import type { ReactNode } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface Props {
  content: string;
}

interface CodeBlockProps {
  language: string;
  children: ReactNode;
}

/**
 * Extract plain text from ReactMarkdown / rehype-highlight
 * children without converting React elements into "[object Object]".
 */
const extractText = (node: ReactNode): string => {
  if (node === null || node === undefined) {
    return "";
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }

  if (isValidElement(node)) {
    const props = node.props as {
      children?: ReactNode;
    };

    return extractText(props.children);
  }

  return "";
};

/**
 * Code block with syntax highlighting and copy support.
 */
const CodeBlock = ({
  language,
  children,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const codeText = extractText(children).replace(/\n$/, "");

    try {
      await navigator.clipboard.writeText(codeText);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-slate-800 bg-[#0b1120]">
      {/* ================================================== */}
      {/* CODE HEADER */}
      {/* ================================================== */}

      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-2">
        <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
          {language}
        </span>

        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md px-2 py-1 text-[11px] text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* ================================================== */}
      {/* CODE */}
      {/* ================================================== */}

      <pre className="max-w-full overflow-x-auto p-4">
        <code
          className={`language-${language} font-mono text-[13px] leading-6`}
        >
          {children}
        </code>
      </pre>
    </div>
  );
};

const MarkdownMessage = ({
  content,
}: Props) => {
  return (
    <div className="min-w-0 max-w-full overflow-hidden text-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          /* ================================================== */
          /* HEADINGS */
          /* ================================================== */

          h1: ({ children }) => (
            <h1 className="mb-4 mt-2 text-xl font-bold text-white">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mb-3 mt-6 text-lg font-bold text-white">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mb-2 mt-5 text-base font-semibold text-white">
              {children}
            </h3>
          ),

          h4: ({ children }) => (
            <h4 className="mb-2 mt-4 text-sm font-semibold text-white">
              {children}
            </h4>
          ),

          /* ================================================== */
          /* PARAGRAPH */
          /* ================================================== */

          p: ({ children }) => (
            <p className="mb-4 break-words text-sm leading-7 text-slate-200 last:mb-0">
              {children}
            </p>
          ),

          /* ================================================== */
          /* STRONG / EMPHASIS */
          /* ================================================== */

          strong: ({ children }) => (
            <strong className="font-semibold text-white">
              {children}
            </strong>
          ),

          em: ({ children }) => (
            <em className="italic text-slate-300">
              {children}
            </em>
          ),

          /* ================================================== */
          /* LISTS */
          /* ================================================== */

          ul: ({ children }) => (
            <ul className="mb-4 ml-5 list-disc space-y-2 text-sm leading-6 text-slate-200">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="mb-4 ml-5 list-decimal space-y-2 text-sm leading-6 text-slate-200">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="pl-1">
              {children}
            </li>
          ),

          /* ================================================== */
          /* BLOCKQUOTE */
          /* ================================================== */

          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-2 border-blue-500 bg-blue-500/5 px-4 py-2 text-sm italic text-slate-300">
              {children}
            </blockquote>
          ),

          /* ================================================== */
          /* HORIZONTAL RULE */
          /* ================================================== */

          hr: () => (
            <hr className="my-5 border-slate-700" />
          ),

          /* ================================================== */
          /* LINKS */
          /* ================================================== */

          a: ({
            href,
            children,
          }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline decoration-blue-400/40 underline-offset-2 hover:text-blue-300"
            >
              {children}
            </a>
          ),

          /* ================================================== */
          /* TABLE */
          /* ================================================== */

          table: ({ children }) => (
            <div className="my-4 max-w-full overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full min-w-[500px] border-collapse text-left text-sm">
                {children}
              </table>
            </div>
          ),

          thead: ({ children }) => (
            <thead className="bg-slate-800/80 text-slate-100">
              {children}
            </thead>
          ),

          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-800">
              {children}
            </tbody>
          ),

          tr: ({ children }) => (
            <tr className="transition hover:bg-slate-800/40">
              {children}
            </tr>
          ),

          th: ({ children }) => (
            <th className="border-b border-slate-700 px-4 py-3 font-semibold">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="px-4 py-3 text-slate-300">
              {children}
            </td>
          ),

          /* ================================================== */
          /* CODE */
          /* ================================================== */

          code: ({
            className,
            children,
            ...props
          }) => {
            const match =
              /language-([\w-]+)/.exec(
                className || "",
              );

            const isBlock = Boolean(match);

            /* ---------------------------------------------- */
            /* INLINE CODE */
            /* ---------------------------------------------- */

            if (!isBlock) {
              return (
                <code
                  className="rounded-md bg-slate-800 px-1.5 py-0.5 font-mono text-[13px] text-blue-300"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            /* ---------------------------------------------- */
            /* CODE BLOCK */
            /* ---------------------------------------------- */

            return (
              <CodeBlock
                language={
                  match?.[1] || "text"
                }
              >
                {children}
              </CodeBlock>
            );
          },

          /* ================================================== */
          /* PRE */
          /* ================================================== */

          pre: ({ children }) => (
            <>{children}</>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownMessage;