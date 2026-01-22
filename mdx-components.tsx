import type { MDXComponents } from "mdx/types";

/**
 * Custom MDX components for the Learn page lessons.
 * These components override default HTML elements in MDX content.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings with custom styling
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6 mt-8 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4 mt-8 pb-2 border-b border-[var(--border-primary)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3 mt-6">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-medium text-[var(--text-primary)] mb-2 mt-4">
        {children}
      </h4>
    ),

    // Paragraphs with readable line height
    p: ({ children }) => (
      <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
        {children}
      </p>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-[var(--text-secondary)] ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-[var(--text-secondary)] ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),

    // Code blocks (inline and block)
    code: ({ children, className }) => {
      // Block code (has language class from rehype-highlight)
      if (className) {
        return (
          <code className={`${className} block overflow-x-auto p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm font-mono`}>
            {children}
          </code>
        );
      }
      // Inline code
      return (
        <code className="px-1.5 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--color-primary-400)] font-mono text-sm">
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="mb-4 rounded-xl overflow-hidden border border-[var(--border-primary)]">
        {children}
      </pre>
    ),

    // Blockquotes for callouts
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-primary-500)] pl-4 py-2 mb-4 bg-[var(--color-primary-500)]/10 rounded-r-lg italic text-[var(--text-secondary)]">
        {children}
      </blockquote>
    ),

    // Tables
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse border border-[var(--border-primary)] rounded-lg overflow-hidden">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-[var(--bg-tertiary)]">{children}</thead>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left font-semibold text-[var(--text-primary)] border-b border-[var(--border-primary)]">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-[var(--text-secondary)] border-b border-[var(--border-primary)]">
        {children}
      </td>
    ),

    // Links
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-400)] underline underline-offset-2 transition-colors"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),

    // Horizontal rule
    hr: () => (
      <hr className="my-8 border-[var(--border-primary)]" />
    ),

    // Strong and emphasis
    strong: ({ children }) => (
      <strong className="font-semibold text-[var(--text-primary)]">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-[var(--text-secondary)]">{children}</em>
    ),

    // Merge with any additional components passed in
    ...components,
  };
}
