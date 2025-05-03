"use client"
import React, { useState } from 'react';
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation';
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

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

// 留言表单组件
const MessageForm = () => {
  const [message, setMessage] = useState('');
  const { user } = useUser();
  
  const maxLength = 600; // 最大字数限制
  
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
  
  const handleSubmit = () => {
    // 这里可以添加发送留言的逻辑
    console.log('提交留言:', { message });
    // 清空输入框
    setMessage('');
  };
  
  return (
    <div className="mb-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
        {/* 左侧头像 */}
        <div className="flex-shrink-0">
          {user?.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt={user?.fullName || '用户头像'} 
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
                disabled={!message.trim()}
                title="发送留言"
              >
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M9.53908 14.4609L4.06343 11.4746C2.6344 10.6952 2.64856 8.64068 4.08807 7.90084C8.05782 5.86056 12.279 4.34556 16.6459 3.39374C17.8998 3.12044 19.3328 2.56333 20.3847 3.61527C21.4367 4.66721 20.8796 6.10024 20.6063 7.35412C19.6544 11.721 18.1394 15.9422 16.0992 19.9119C15.3593 21.3514 13.3048 21.3656 12.5254 19.9366L9.53908 14.4609ZM9.53908 14.4609L12.8477 11.1523" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
