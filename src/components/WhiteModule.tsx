"use client";

import { IconCloud } from "@/components/magicui/icon-cloud";
import { Lens } from "@/components/magicui/lens";
import { AnimatedList } from "@/components/magicui/animated-list";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import ColourfulText from "@/components/ui/colourful-text";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pointer } from "@/components/magicui/pointer";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

// 通知列表数据
interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

// 备用通知数据（API失败时使用）
const fallbackNotifications = [
  {
    name: "新消息提醒",
    description: "您有一条新的消息",
    time: "刚刚",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "系统更新",
    description: "系统已更新到最新版本",
    time: "10分钟前",
    icon: "⚙️",
    color: "#1E86FF",
  },
  {
    name: "账户安全",
    description: "请定期修改您的密码",
    time: "1小时前",
    icon: "🔒",
    color: "#00C9A7",
  },
  {
    name: "新功能上线",
    description: "探索我们的新功能",
    time: "2小时前",
    icon: "✨",
    color: "#FFB800",
  },
];

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

function AnimatedListDemo({
  className,
}: {
  className?: string;
}) {
  const [notifications, setNotifications] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取通知数据
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');
        if (!response.ok) {
          throw new Error('获取通知失败');
        }
        const data = await response.json();
        
        // 确保有足够的通知数据
        let processedData = data;
        if (data.length < 10) {
          // 如果通知数量不足，复制现有通知填充
          processedData = Array.from(
            { length: Math.ceil(10 / data.length) },
            () => data
          ).flat().slice(0, 20);
        }
        
        setNotifications(processedData);
      } catch (error) {
        console.error('获取通知失败:', error);
        // 使用备用数据
        const duplicatedFallback = Array.from(
          { length: 5 },
          () => fallbackNotifications
        ).flat();
        setNotifications(duplicatedFallback);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
        className,
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}

export function WhiteModule() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );

  return (
    <div className="relative flex size-full">
      {/* 背景水滴 - BackgroundBeamsWithCollision 组件 */}
      <BackgroundBeamsWithCollision>
      {/* 指针 - Pointer 组件 */}
      <Pointer className="fill-blue-500" />
      {/* 左侧面板 - Lens 组件 */}
      <div className="w-1/3 h-full flex items-center justify-center p-8 bg-white">
        <Card className="relative max-w-md shadow-none">
          <CardHeader>
            <Lens
              zoomFactor={2}
              lensSize={150}
              isStatic={false}
              ariaLabel="Zoom Area"
            >
              <img
                src="https://res.cloudinary.com/dqsej8eol/image/upload/v1738573813/674aa6090ebe5_vhudzp.jpg"
                alt="image placeholder"
                width={500}
                height={500}
              />
            </Lens>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-1xl">七禾页话</CardTitle>
            <CardDescription>
              搞怪的不是红绿灯,不是时机,
             <ColourfulText text="而是我数不清的犹豫" />
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      
      {/* 中间面板 - IconCloud 组件 */}
      <div className="w-1/3 h-full flex items-center justify-center p-8 bg-white">      
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">心灯已似风灯冷</h2>
          <p className="text-gray-600 mb-6">希望终从以下生</p>
          <IconCloud images={images} />
        </div>
      </div>
      
      {/* 右侧面板 - AnimatedListDemo 组件 */}
      <div className="w-1/3 h-full flex items-center justify-center p-8 bg-white">
        <AnimatedListDemo className="max-w-sm" />
      </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}

export default WhiteModule;
