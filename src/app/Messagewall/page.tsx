"use client"
import React, { useState } from 'react';
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation';

// 示例留言数据
const initialMessages = [
  {
    id: 1,
    name: "张三",
    username: "@zhangsan",
    body: "这个网站做得真不错，希望能越做越好！",
    img: "https://avatar.vercel.sh/zhangsan",
    date: "2023-05-15"
  },
  {
    id: 2,
    name: "李四",
    username: "@lisi",
    body: "内容很有趣，期待更多更新。",
    img: "https://avatar.vercel.sh/lisi",
    date: "2023-05-16"
  },
  {
    id: 3,
    name: "王五",
    username: "@wangwu",
    body: "这里的设计风格我很喜欢，简洁又不失美感。",
    img: "https://avatar.vercel.sh/wangwu",
    date: "2023-05-17"
  },
  {
    id: 4,
    name: "赵六",
    username: "@zhaoliu",
    body: "希望能多增加一些技术分享的内容。",
    img: "https://avatar.vercel.sh/zhaoliu",
    date: "2023-05-18"
  },
  {
    id: 5,
    name: "钱七",
    username: "@qianqi",
    body: "这个网站的动画效果真的很棒！请问是怎么实现的？",
    img: "https://avatar.vercel.sh/qianqi",
    date: "2023-05-19"
  },
  {
    id: 6,
    name: "孙八",
    username: "@sunba",
    body: "加油！支持你们继续创作高质量的内容。",
    img: "https://avatar.vercel.sh/sunba",
    date: "2023-05-20"
  },
];

// 评论卡片组件
const MessageCard = ({
  img,
  name,
  username,
  body,
  date,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  date: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
        <div className="ml-auto text-xs text-gray-500">{date}</div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

// 留言墙页面组件
const MessagewallPage = () => {
  
  // 分割留言数据为两行
  const firstRow = initialMessages.slice(0, initialMessages.length / 2);
  const secondRow = initialMessages.slice(initialMessages.length / 2);

  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-10">
      
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-8 text-gray-900 dark:text-white">欢迎来到我的留言墙</h1>
        
        <p className="text-center mb-16 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          在这里，你可以留下你想对我说的话，或是你的建议，或是你的想法，或是你的批评，或是你的赞美，或是你的鼓励，或是你的吐槽。
        </p>
        {/* 未登录显示 */}
        <SignedOut>
          <SignInButton mode="modal" forceRedirectUrl={pathname}>
            登录后才可以留言噢
          </SignInButton>
        </SignedOut>
        {/* 登录后显示 */}
        <SignedIn>
       111111111111
        </SignedIn>  
        
        {/* 留言展示 */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">最新留言</h2>
          
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:30s] mb-4">
              {firstRow.map((message) => (
                <MessageCard key={message.id} {...message} />
              ))}
            </Marquee>
            
            <Marquee reverse pauseOnHover className="[--duration:25s]">
              {secondRow.map((message) => (
                <MessageCard key={message.id} {...message} />
              ))}
            </Marquee>
            
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-gray-950"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-gray-950"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagewallPage;
