"use client"
import React, { useState } from 'react';
import { Marquee } from "@/components/magicui/marquee";
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs';
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { MessageCard } from "./MessageCard";
import { Message } from "@/lib/db/schema";

// 留言表单组件
const MessageForm = () => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  
  const maxLength = 60; // 最大字数限制
  
  // 自动提交功能 - 在输入框失去焦点且有内容时提交
  const handleBlur = () => {
    if (message.trim()) {
      handleSubmit();
    }
  };
  
  // 在按下回车键且不按Shift键时提交
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        handleSubmit();
      }
    }
  };
  
  const handleSubmit = async () => {
    if (isSubmitting || !message.trim()) return;
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '提交留言失败');
      }
      
      // 成功后刷新页面以显示新留言
      window.location.reload();
      
      // 清空输入框
      setMessage('');
    } catch (error) {
      console.error('提交留言失败:', error);
      alert('留言提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="mb-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
        {/* 左侧头像 */}
        <div className="flex-shrink-0">
            
          {user?.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt={user?.username || '用户头像'} 
              className="w-10 h-10 rounded-full" 
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          )}
        </div>
        
        {/* 右侧输入框 */}
        <div className="flex-grow">
          <textarea
            className="w-full resize-none bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 min-h-[50px] leading-tight py-1 pt-8"
            placeholder="说点什么吧，万一火不了呢..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            maxLength={maxLength}
            rows={2}
          />
          
          {/* 底部信息栏 */}
          <div className="flex justify-between items-center mt-1">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              支持 Markdown 与 GFM
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              {message.length}/{maxLength}
              <button 
                type="button"
                onClick={handleSubmit}
                className="ml-2 flex items-center justify-center transition-colors hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none"
                disabled={isSubmitting || !message.trim()}
                title="发送留言"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">发送中...</span>
                ) : (
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M9.53908 14.4609L4.06343 11.4746C2.6344 10.6952 2.64856 8.64068 4.08807 7.90084C8.05782 5.86056 12.279 4.34556 16.6459 3.39374C17.8998 3.12044 19.3328 2.56333 20.3847 3.61527C21.4367 4.66721 20.8796 6.10024 20.6063 7.35412C19.6544 11.721 18.1394 15.9422 16.0992 19.9119C15.3593 21.3514 13.3048 21.3656 12.5254 19.9366L9.53908 14.4609ZM9.53908 14.4609L12.8477 11.1523" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 客户端留言墙组件
export default function ClientMessageWall({ 
  firstRow, 
  secondRow 
}: { 
  firstRow: Message[]; 
  secondRow: Message[]; 
}) {
  const pathname = usePathname();
  
  return (
    <>
      {/* 未登录显示 */}
      <SignedOut>
        <div className="flex justify-center mb-16">
          <SignInButton mode="modal" forceRedirectUrl={pathname}>
            <InteractiveHoverButton className="bg-black text-white">登录后才可以留言噢</InteractiveHoverButton>
          </SignInButton>
        </div>
      </SignedOut>
      {/* 登录后显示 */}
      <SignedIn>
        <MessageForm />
      </SignedIn>  
      
      {/* 留言展示 */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">最新留言</h2>
        
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          {firstRow.length > 0 ? (
            <>
              <Marquee pauseOnHover className="[--duration:30s] mb-4">
                {firstRow.map((message) => (
                  <MessageCard key={message.id} {...message} />
                ))}
              </Marquee>
              
              {secondRow.length > 0 && (
                <Marquee reverse pauseOnHover className="[--duration:25s]">
                  {secondRow.map((message) => (
                    <MessageCard key={message.id} {...message} />
                  ))}
                </Marquee>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              暂无留言，成为第一个留言的人吧！
            </div>
          )}
          
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-gray-950"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-gray-950"></div>
        </div>
      </div>
    </>
  );
}