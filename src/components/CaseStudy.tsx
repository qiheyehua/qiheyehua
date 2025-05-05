"use client";
import { cn } from "@/lib/utils";
import { CardStack } from "@/components/ui/card-stack";
import { useState, useEffect } from "react";
import { client } from "@/lib/sanity/lib/client";
import { Cover } from "@/components/ui/cover";
import { BoxReveal } from "@/components/magicui/box-reveal";
import dynamic from "next/dynamic";


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

export function AnimatedGridPatternDemo() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);
        const result = await getTestimonials();
        
        // 处理从Sanity获取的数据，添加id和格式化内容
        if (result && result.length > 0) {
          const formattedData = result.map((item: any, index: number) => ({
            id: index,
            name: item.name || "未知名称",
            designation: item.designation || "未知职位",
            content: (
              <p>
                {parseHighlightContent(item.content || "无内容")}
              </p>
            ),
          }));
          setTestimonials(formattedData);
        } else {
          // 如果没有数据，使用默认数据
          setTestimonials(FALLBACK_CARDS);
        }
      } catch (error) {
        console.error("获取文案失败:", error);
        setTestimonials(FALLBACK_CARDS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
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
          </div>

          {/* 右侧卡片区 */}
          <div className="h-[40rem] flex justify-center">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-60 w-full max-w-md rounded-3xl bg-gray-200 dark:bg-gray-700"></div>
              </div>
            ) : (
              <CardStack items={testimonials.length > 0 ? testimonials : FALLBACK_CARDS} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnimatedGridPatternDemo;
