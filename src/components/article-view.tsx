"use client";
import React, { useEffect, useState, useRef } from "react";
import { client } from "@/lib/sanity/lib/client";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Link from "next/link";

interface ArticleViewProps {
  slug?: string;
}

interface Article {
  _id: string;
  title: string;
  author?: string;
  mainImage?: string;
  publishedAt?: string;
  content: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function ArticleView({ slug }: ArticleViewProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showToc, setShowToc] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        // 查询条件：如果提供了slug，则查询特定文章，否则查询最新的文章
        const query = slug 
          ? `*[_type == "article" && slug.current == $slug][0] {
              _id,
              title,
              author,
              "mainImage": mainImage.asset->url,
              publishedAt,
              content
            }` 
          : `*[_type == "article"] | order(publishedAt desc)[0] {
              _id,
              title,
              author,
              "mainImage": mainImage.asset->url,
              publishedAt,
              content
            }`;
        
        const params = slug ? { slug } : {};
        
        const result = await client.fetch(query, params);
        
        if (result) {
          setArticle({
            _id: result._id,
            title: result.title,
            author: result.author,
            mainImage: result.mainImage,
            publishedAt: result.publishedAt,
            content: result.content,
          });
        } else {
          setError("文章不存在");
        }
      } catch (err) {
        console.error("获取文章失败:", err);
        setError("加载文章时出错");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  // 生成目录
  useEffect(() => {
    if (contentRef.current && article) {
      // 等待DOM渲染完成
      setTimeout(() => {
        const headings = contentRef.current?.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        if (headings && headings.length > 0) {
          const tocItems: TocItem[] = [];
          
          headings.forEach((heading, index) => {
            const level = parseInt(heading.tagName.substring(1));
            const text = heading.textContent || `标题 ${index + 1}`;
            const id = `heading-${index}`;
            
            // 为标题添加ID，以便锚点定位
            heading.setAttribute('id', id);
            
            tocItems.push({
              id,
              text,
              level
            });
          });
          
          setToc(tocItems);
        } else {
          setShowToc(false);
        }
      }, 100);
    }
  }, [article, isLoading]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-10"></div>
        <div className="h-64 bg-gray-200 rounded mb-6"></div>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-500">文章加载失败</h2>
        <p className="text-red-500">{error || "未找到文章"}</p>
        <Link href="/articles" className="inline-block mt-8 text-blue-600 hover:underline">
          返回文章列表
        </Link>
      </div>
    );
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article>
      <div className="mb-10">
        <Link 
          href="/articles" 
          className="text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          <span>←</span> 返回文章列表
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {showToc && toc.length > 1 && (
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium mb-3 pb-2 border-b">目录</h3>
              <nav className="toc">
                <ul className="space-y-1">
                  {toc.map((item) => (
                    <li 
                      key={item.id}
                      className="transition-colors"
                      style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
                    >
                      <button
                        onClick={() => scrollToHeading(item.id)}
                        className="text-left text-sm hover:text-blue-600 py-1 truncate w-full"
                      >
                        {item.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}

        <div className={`${showToc && toc.length > 1 ? 'lg:col-span-3' : 'lg:col-span-4'} order-1 lg:order-2`}>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            
            {article.author && (
              <p className="text-gray-500 -mt-2 mb-8 not-prose">
                作者: {article.author}
                {article.publishedAt && (
                  <> · {new Date(article.publishedAt).toLocaleDateString('zh-CN')}</>
                )}
              </p>
            )}
            
            {article.mainImage && (
              <img 
                src={article.mainImage} 
                alt={article.title} 
                className="w-full h-auto rounded-lg mb-8 not-prose"
              />
            )}
            
            <div className="markdown-content" ref={contentRef}>
              <ReactMarkdown 
                rehypePlugins={[rehypeRaw]} 
                remarkPlugins={[remarkGfm]}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ArticleView;