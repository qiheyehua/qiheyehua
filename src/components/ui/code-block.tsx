"use client";

import React from "react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  highlightLines?: number[];
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  filename,
  highlightLines = [],
}) => {
  return (
    <div className="rounded-lg overflow-hidden bg-zinc-900 text-white">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700">
          <div className="text-sm font-mono text-zinc-400">{filename}</div>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
      )}
      <Highlight
        theme={themes.vsDark}
        code={code.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className="p-4 overflow-auto" style={{ ...style, background: "transparent" }}>
            {tokens.map((line, i) => {
              const isHighlighted = highlightLines?.includes(i + 1);
              return (
                <div
                  key={i}
                  {...getLineProps({ line, key: i })}
                  className={`${isHighlighted ? "bg-blue-900/30 -mx-4 px-4" : ""}`}
                >
                  <span className="inline-block w-8 mr-2 text-right text-zinc-500 select-none">
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}; 