"use client";
import { cn } from "@/lib/utils";
import { CardStack } from "@/components/ui/card-stack";
import { useState, useEffect } from "react";
import { client } from "@/lib/sanity/lib/client";
import { Cover } from "@/components/ui/cover";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { StickyScroll, Article } from "@/components/ui/sticky-scroll-reveal";
import { PinContainer } from "@/components/ui/3d-pin";

// 文章示例数据
const articleSamples: Article[] = [
  {
    id: "1",
    title: "如何复刻本网站，零基快速建博客",
    image: "https://cdn.sanity.io/images/w04355b9/production/5cc00e58b80c85ea508a6809f7897baa3ba883c5-1080x1080.jpg",
    date: "2023/07/15",
    slug: "explore-nature-forest-ecosystem",
    author: "教程",
    readingTime: "13分钟阅读",
    categories: ["网站开发", "教程"]
  },
  {
    id: "2",
    title: "现代城市规划的新趋势与可持续发展",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1280",
    date: "2023/06/28",
    slug: "modern-city-planning-trends",
    author: "规划",
    readingTime: "9分钟阅读",
    categories: ["城市规划", "可持续发展"]
  },
  {
    id: "3",
    title: "深海探索：揭开海洋未知的神秘面纱",
    image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=1280",
    date: "2023/06/10",
    slug: "deep-sea-exploration",
    author: "科学",
    readingTime: "7分钟阅读",
    categories: ["海洋科学", "探索"]
  },
  {
    id: "4",
    title: "世界屋脊：喜马拉雅山脉地质秘密",
    image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?q=80&w=1280",
    date: "2023/05/15",
    slug: "himalaya-geological-mysteries",
    author: "地理",
    readingTime: "15分钟阅读",
    categories: ["地质研究", "地理"]
  },
  {
    id: "5",
    title: "太空探索的未来：民间航天新时代",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1280",
    date: "2023/05/01",
    slug: "future-of-space-exploration",
    author: "航天",
    readingTime: "11分钟阅读",
    categories: ["航天科技", "未来"]
  }
];

// 定义文案类型
interface Testimonial {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

// 解析文本中的高亮标记 [[高亮文本]]
const parseHighlightContent = (content: string): (React.ReactNode)[] => {
  if (!content) return [content];
  
  // 使用正则表达式匹配 [[文本]] 格式的高亮内容
  const regex = /\[\[(.*?)\]\]/g;
  const parts: (string | React.ReactNode)[] = [];
  
  let lastIndex = 0;
  let match;
  
  // 找到所有匹配项并处理
  while ((match = regex.exec(content)) !== null) {
    // 添加匹配前的普通文本
    if (match.index > lastIndex) {
      parts.push(content.substring(lastIndex, match.index));
    }
    
    // 添加高亮文本
    parts.push(<Highlight key={match.index}>{match[1]}</Highlight>);
    
    // 更新上次匹配的位置
    lastIndex = match.index + match[0].length;
  }
  
  // 添加剩余的普通文本
  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex));
  }
  
  return parts;
};

// 备用数据，在Sanity数据获取失败时使用
const FALLBACK_CARDS: Testimonial[] = [
  {
    id: 0,
    name: "Manu Arora",
    designation: "Senior Software Engineer",
    content: (
      <p>
        These cards are amazing, <Highlight>I want to use them</Highlight> in my
        project. Framer motion is a godsend ngl tbh fam 🙏
      </p>
    ),
  },
  {
    id: 1,
    name: "Elon Musk",
    designation: "Senior Shitposter",
    content: (
      <p>
        I dont like this Twitter thing,{" "}
        <Highlight>deleting it right away</Highlight> because yolo. Instead, I
        would like to call it <Highlight>X.com</Highlight> so that it can easily
        be confused with adult sites.
      </p>
    ),
  },
  {
    id: 2,
    name: "Tyler Durden",
    designation: "Manager Project Mayhem",
    content: (
      <p>
        The first rule of
        <Highlight>Fight Club</Highlight> is that you do not talk about fight
        club. The second rule of
        <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
        club.
      </p>
    ),
  },
];

// Sanity查询函数
const getTestimonials = async () => {
  const query = `*[_type == "testimonial"] {
    _id,
    name,
    designation,
    "content": content
  }`;
  
  return await client.fetch(query);
};

// 获取文章数据的函数（如果有Sanity或其他CMS集成，可以替换为实际的API调用）
const getArticles = async (): Promise<Article[]> => {
  try {
    // 构建查询，获取最新的5篇文章
    const query = `*[_type == "article"] | order(publishedAt desc)[0...5] {
      _id,
      title,
      "slug": slug.current,
      "date": publishedAt,
      "image": mainImage.asset->url,
      author,
      "readingTime": select(
        length(content) > 5000 => "15分钟阅读",
        length(content) > 3000 => "10分钟阅读",
        length(content) > 1000 => "5分钟阅读",
        "3分钟阅读"
      ),
      categories
    }`;
    
    // 从Sanity获取数据
    const result = await client.fetch(query);
    
    // 格式化数据为Article类型
    if (result && result.length > 0) {
      return result.map((item: any) => ({
        id: item._id,
        title: item.title,
        slug: item.slug,
        date: item.date 
          ? new Date(item.date).toLocaleDateString('zh-CN', {
              year: 'numeric', 
              month: 'numeric', 
              day: 'numeric'
            }).replace(/\//g, '/')
          : "2023/07/15", // 默认日期
        image: item.image || "https://images.unsplash.com/photo-1519681393784-d120267933ba", // 默认图片
        author: item.author || "教程",
        readingTime: item.readingTime || "10分钟阅读",
        categories: item.categories && item.categories.length > 0 
          ? item.categories 
          : ["未分类"]
      }));
    }
    
    // 如果没有获取到数据，返回示例数据
    return articleSamples;
  } catch (error) {
    console.error("获取文章数据失败:", error);
    // 发生错误时返回示例数据
    return articleSamples;
  }
};

export function AnimatedGridPatternDemo() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // 并行获取文案和文章数据
        const [testimonialResult, articleResult] = await Promise.all([
          getTestimonials(),
          getArticles()
        ]);
        
        // 处理文案数据
        if (testimonialResult && testimonialResult.length > 0) {
          const formattedTestimonials = testimonialResult.map((item: any, index: number) => ({
            id: index,
            name: item.name || "未知名称",
            designation: item.designation || "未知职位",
            content: (
              <p>
                {parseHighlightContent(item.content || "无内容")}
              </p>
            ),
          }));
          setTestimonials(formattedTestimonials);
        } else {
          setTestimonials(FALLBACK_CARDS);
        }
        
        // 设置文章数据
        setArticles(articleResult || []);
      } catch (error) {
        console.error("获取数据失败:", error);
        setTestimonials(FALLBACK_CARDS);
        setArticles(articleSamples);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  

  return (
    <section className="relative w-full  px-4 py-2 md:py-8 overflow-hidden">
      <div className="container mx-auto">
        {/* 左右布局容器 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* 左侧内容区 */}
          <div className="flex flex-col space-y-6 md:pr-8">
         
            <BoxReveal boxColor={"#212f3d"} duration={0.5}>
              <p className="text-[1.5rem] font-medium leading-relaxed">
                我热爱讲故事，因为其他人的故事深深地影响了我
              </p>
            </BoxReveal>
            <BoxReveal boxColor={"#212f3d"} duration={0.5}>
              <Cover>
                <p className="text-[1.5rem] font-medium leading-relaxed">
                  <a href="/Messagewall" className="hover:text-blue-500 transition-colors">
                    在这里写下你的故事
                  </a>
                </p>
              </Cover>
            </BoxReveal>
            <div className="w-full py-4">
              <StickyScroll content={articles} contentClassName="hover:scale-105 transition-transform duration-300" />
            </div>
            
          </div>

          {/* 右侧卡片区 */}
          <div className="flex flex-col space-y-8 md:space-y-12 lg:space-y-16 items-center justify-start min-h-[40rem] py-4">
            {/* 第一个卡片 - CardStack */}
            <div className="w-full flex justify-center">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-60 w-full max-w-md rounded-3xl bg-gray-200 dark:bg-gray-700"></div>
                </div>
              ) : (
                <div className="transform-gpu">
                  <CardStack 
                    items={testimonials.length > 0 ? testimonials : FALLBACK_CARDS} 
                    offset={8}
                    scaleFactor={0.05}
                  />
                </div>
              )}
            </div>
            
            {/* 第二个卡片 - PinContainer */}
            <div className="w-full flex justify-center">
              <div className="h-[36rem] w-full flex items-center justify-center -mt-8">
                <PinContainer
                  title="/ui.aceternity.com"
                  href="https://twitter.com/mannupaaji"
                >
                  <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                      Aceternity UI
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal">
                      <span className="text-slate-500 ">
                        Customizable Tailwind CSS and Framer Motion Components.
                      </span>
                    </div>
                    <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
                  </div>
                </PinContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnimatedGridPatternDemo;
