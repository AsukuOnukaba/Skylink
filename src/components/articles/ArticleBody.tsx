import { Link } from "react-router-dom";
import type { ArticleBlock } from "@/data/articles/article-types";

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

/** Renders inline [label](/path) links inside article paragraphs. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, index) => {
        const match = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (!match) return <span key={index}>{part}</span>;
        const [, label, href] = match;
        if (href.startsWith("/")) {
          return (
            <Link
              key={index}
              to={href}
              className="font-medium text-sky-700 underline-offset-2 hover:underline"
            >
              {label}
            </Link>
          );
        }
        return (
          <a
            key={index}
            href={href}
            className="font-medium text-sky-700 underline-offset-2 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            {label}
          </a>
        );
      })}
    </>
  );
}

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2": {
            const id = slugifyHeading(block.text);
            return (
              <h2
                key={`h2-${index}`}
                id={id}
                className="scroll-mt-24 text-2xl font-bold text-navy-950"
              >
                {block.text}
              </h2>
            );
          }
          case "h3":
            return (
              <h3
                key={`h3-${index}`}
                className="text-xl font-semibold text-navy-900"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p
                key={`p-${index}`}
                className="text-base leading-relaxed text-slate-700"
              >
                <RichText text={block.text} />
              </p>
            );
          case "ul":
            return (
              <ul
                key={`ul-${index}`}
                className="list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700"
              >
                {block.items.map((item) => (
                  <li key={item.slice(0, 48)}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={`ol-${index}`}
                className="list-decimal space-y-2 pl-5 text-base leading-relaxed text-slate-700"
              >
                {block.items.map((item) => (
                  <li key={item.slice(0, 48)}>
                    <RichText text={item} />
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div
                key={`table-${index}`}
                className="overflow-x-auto rounded-md border border-slate-200"
              >
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-100 text-navy-900">
                    <tr>
                      {block.headers.map((header) => (
                        <th key={header} className="px-3 py-2 font-semibold">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-t border-slate-200 text-slate-700"
                      >
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-3 py-2 align-top">
                            <RichText text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "note":
            return (
              <aside
                key={`note-${index}`}
                className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700"
              >
                <RichText text={block.text} />
              </aside>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
