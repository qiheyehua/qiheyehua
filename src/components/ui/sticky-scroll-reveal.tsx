"use client";
import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export interface Article {
  id: string;
  title: string;
  image: string;
  summary?: string;
  date: string;
  slug: string;
  alt?: string;
  author?: string;
  categories?: string[];
  content?: string;
  readingTime?: string; // 阅读时间
}

export const StickyScroll = ({
  content,
  contentClassName,
  maxArticles = 5,
}: {
  content: Article[];
  contentClassName?: string;
  maxArticles?: number;
}) => {
  // 只显示最近的5篇文章（或自定义数量）
  const articles = content.slice(0, maxArticles);
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = articles.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = articles.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  // 格式化日期函数
  const formatDate = (dateString: string) => {
    // 如果日期已经是格式化的形式（如 "2023/07/15"），则直接返回
    if (dateString.includes('/')) return dateString;
    
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric' 
    }).replace(/\//g, '/');
  };

  return (
    <motion.div
      className="relative h-[80vh] overflow-y-auto rounded-md bg-white p-6"
      ref={ref}
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">最新文章</h2>
        
        {articles.map((article, index) => (
          <Link href={`/articles/${article.slug}`} key={article.id || index}>
            <motion.div 
              className="mb-8 cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              initial={{ opacity: 0 }}
              animate={{
                opacity: activeCard === index ? 1 : 0.85,
                scale: activeCard === index ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* 卡片内容 */}
              <div className="relative flex flex-col">
                {/* 图片部分 */}
                <div 
                  className={cn(
                    "relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl",
                    contentClassName
                  )}
                >
                  <Image 
                    src={article.image} 
                    alt={article.title} 
                    fill 
                    className="object-cover"
                    priority={index === 0}
                  />
                  
                  {/* 暗色渐变叠加，增强标题可读性 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
                </div>
                
                {/* 文字信息部分 - 黑色背景 */}
                <div className="flex flex-col bg-black p-4 text-white rounded-b-2xl">
                  <h3 className="mb-3 text-xl font-bold leading-tight">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* 日期区域 */}
                      <div className="flex items-center space-x-1 text-xs">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                          />
                        </svg>
                        <span>{formatDate(article.date)}</span>
                      </div>

                      {/* 作者/分类区域 */}
                      {article.author && (
                        <div className="flex items-center space-x-1 text-xs">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                            />
                          </svg>
                          <span>{article.author}</span>
                        </div>
                      )}

                      {/* 分类区域 */}
                      {article.categories && article.categories.length > 0 && (
                        <div className="flex items-center space-x-1 text-xs">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" 
                            />
                          </svg>
                          <span>{article.categories.join(', ')}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* 阅读时间区域 */}
                    <div className="flex items-center space-x-1 text-xs">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                      </svg>
                      <span>{article.readingTime || '10分钟阅读'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
        
        {articles.length === 0 && (
          <div className="flex h-40 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
            暂无文章
          </div>
        )}
        
        <div className="h-20" />
      </div>
    </motion.div>
  );
};
