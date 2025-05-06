"use client";
import React, { useEffect, useState, useRef } from "react";
import { TextAnimate } from "@/components/magicui/text-animate";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { client } from "@/lib/sanity/lib/client";
import { Pointer } from "@/components/magicui/pointer";
import { ScratchToReveal } from "@/components/magicui/scratch-to-reveal";


export function Welcome() {
  // 定义状态来存储从Sanity获取的故事数据
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scratchSize, setScratchSize] = useState({ width: 300, height: 150 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 定义默认数据，在加载时或出错时显示
  const defaultTestimonials = [
    {
      quote: "讲述世界故事的方式有无数种，这是我的方式。",
      name: "默认故事",
      designation: "正在加载中...",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
  ];
  
  useEffect(() => {
    // 从Sanity获取故事数据
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        // 定义Sanity查询
        const query = `*[_type == "story"] {
          quote,
          name,
          designation,
          "src": src.asset->url
        }`;
        
        const result = await client.fetch(query);
        if (result && result.length > 0) {
          setStories(result);
        }
      } catch (error) {
        console.error("获取故事数据失败:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStories();
    
    // 计算ScratchToReveal的尺寸
    const updateScratchSize = () => {
      const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;
      const width = Math.min(550, containerWidth - 20);
      const height = Math.min(250, width * 0.45);
      setScratchSize({ width, height });
    };
    
    updateScratchSize();
    
    // 添加窗口大小变化事件监听器
    window.addEventListener('resize', updateScratchSize);
    
    // 清理事件监听器
    return () => {
      window.removeEventListener('resize', updateScratchSize);
    };
  }, []);
  
  // 使用从Sanity获取的数据或默认数据
  const testimonials = stories.length > 0 ? stories : defaultTestimonials;
  
  return (
    // 顶部文字部分
    <div className="w-full flex flex-col md:flex-row mb-8 md:mb-16 px-4 md:px-0">
      <Pointer className="hidden md:block">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" className="fill-purple-500" />
            <circle cx="12" cy="12" r="5" className="fill-white" />
          </svg>
        </Pointer>
      {/* 左侧文字 div */}
      <div className="w-full md:w-1/2 md:pl-[5%] mb-8 md:mb-0">
        <div className="max-w-[600px] space-y-4">
          <BoxReveal boxColor={"#212f3d"} duration={0.5}>
            <p className="text-lg md:text-[1.5rem] font-medium leading-relaxed">
              我在网上看见了关于
              <span className="text-[#99CCFF]">#编程</span>、
              <span className="text-[#99CCFF]">#游戏</span>、
              <span className="text-[#99CCFF]">#内容创作</span>
              和
              <span className="text-[#99CCFF]">#生活</span>
              的故事。
            </p>
          </BoxReveal>
          
          <BoxReveal boxColor={"#212f3d"} duration={1}>
            <p className="text-lg md:text-[1.5rem] font-medium leading-relaxed">
              这些故事令我印象深刻，我决定将它们分享给大家。
            </p>
          </BoxReveal>
          
          <p className="text-lg md:text-[1.5rem] font-medium leading-relaxed">
            <span className="inline-block bg-[#3eede7] dark:bg-[#FFE4CC]/90 px-4 py-1 rounded-lg">
              <TextAnimate animation="blurInUp" by="character">
                讲述世界故事的方式有无数种，这是我的方式。
              </TextAnimate>
            </span>
          </p>
          <div className="w-full overflow-hidden" ref={containerRef}>
            <ScratchToReveal
              width={scratchSize.width}
              height={scratchSize.height}
              minScratchPercentage={70}
              className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"
              gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
            >
              <span className="text-base md:text-2xl">Happy every day</span>
            </ScratchToReveal>
          </div>
        </div>
      </div>

      {/* 右侧 div - 显示故事 */}
      <div className="w-full md:w-1/2">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-xl text-gray-500">正在加载故事...</p>
          </div>
        ) : (
          <AnimatedTestimonials testimonials={testimonials} />
        )}
      </div>
    </div>
  );
}

export default Welcome;