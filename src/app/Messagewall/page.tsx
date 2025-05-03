import React from 'react';
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { getAllMessages } from "@/lib/db/queries";
import ClientMessageWall from "./client";

// 留言墙页面组件（服务器组件）
export default async function MessagewallPage() {
  // 从数据库获取留言
  const messages = await getAllMessages();
  
  // 分割留言数据为两行
  const firstRow = messages.slice(0, Math.ceil(messages.length / 2));
  const secondRow = messages.slice(Math.ceil(messages.length / 2));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-8 text-gray-900 dark:text-white">欢迎来到我的留言墙</h1>
        
        <p className="text-center mb-16 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          在这里，你可以留下你想对我说的话，或是你的建议，或是你的想法，或是你的批评，或是你的赞美，或是你的鼓励，或是你的吐槽。
        </p>
        
        {/* 客户端组件处理交互部分 */}
        <ClientMessageWall firstRow={firstRow} secondRow={secondRow} />
      </div>
    </div>
  );
}

// 评论卡片组件
export const MessageCard = ({
  avatar,
  username,
  content,
  date,
}: {
  avatar: string | null;
  username: string;
  content: string;
  date: string | Date;
}) => {
  // 处理avatar为null的情况
  const avatarUrl = avatar || `https://avatar.vercel.sh/${username}`;
  // 格式化日期
  const formattedDate = date instanceof Date ? 
    date.toISOString().split('T')[0] : date;
  
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
        <img className="rounded-full" width="32" height="32" alt="" src={avatarUrl} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {username}
          </figcaption>
        </div>
        <div className="ml-auto text-xs text-gray-500">{formattedDate}</div>
      </div>
      <blockquote className="mt-2 text-sm">{content}</blockquote>
    </figure>
  );
};
