import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BlogMarkdownProps = {
  children: string;
};

const components: Components = {
  h1: ({ children }) => (
    <h2 className="mt-10 scroll-mt-24 font-jetbrains text-xl font-semibold text-foreground first:mt-0">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h3 className="mt-10 scroll-mt-24 font-jetbrains text-lg font-semibold text-foreground first:mt-0">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h4 className="mt-8 scroll-mt-24 font-jetbrains text-base font-semibold text-foreground">
      {children}
    </h4>
  ),
  h4: ({ children }) => (
    <h5 className="mt-6 font-jetbrains text-sm font-semibold text-foreground">{children}</h5>
  ),
  p: ({ children }) => (
    <p className="mb-4 font-jetbrains text-sm leading-relaxed text-muted-foreground last:mb-0">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  del: ({ children }) => (
    <del className="text-muted-foreground line-through">{children}</del>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-primary underline-offset-4 transition-colors hover:text-opposite-color hover:underline"
      rel="noopener noreferrer"
      target={href?.startsWith("http") ? "_blank" : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc space-y-1 pl-6 font-jetbrains text-sm leading-relaxed text-muted-foreground last:mb-0 marker:text-primary/70">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-1 pl-6 font-jetbrains text-sm leading-relaxed text-muted-foreground last:mb-0 marker:text-primary/70">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="[&>p]:mb-2 [&>p]:last:mb-0">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mb-4 border-l-2 border-primary/35 pl-4 font-jetbrains text-sm italic text-muted-foreground last:mb-0">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-border" />,
  code: ({ className, children, ...props }) => {
    const text = String(children);
    const isFencedBlock =
      /language-[\w-]*/.test(className ?? "") || text.includes("\n");
    if (isFencedBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-muted/80 px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="mb-4 overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-[0.85rem] leading-relaxed text-foreground last:mb-0 [&>code]:bg-transparent [&>code]:p-0">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="mb-4 overflow-x-auto last:mb-0">
      <table className="w-full min-w-[16rem] border-collapse border border-border font-jetbrains text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted/30">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-border px-3 py-2 text-muted-foreground">{children}</td>
  ),
  img: ({ alt, src }) => (
    // eslint-disable-next-line @next/next/no-img-element -- blog body is author-controlled markdown
    <img
      alt={alt ?? ""}
      className="my-4 h-auto max-w-full rounded-md border border-border"
      src={src ?? undefined}
    />
  ),
};

export function BlogMarkdown({ children }: BlogMarkdownProps) {
  return (
    <div className="max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
