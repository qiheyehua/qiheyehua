import React from 'react';
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
