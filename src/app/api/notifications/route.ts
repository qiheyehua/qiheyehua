import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity/lib/client';
import { groq } from 'next-sanity';

// 颜色和图标列表，用于随机生成
const colors = ['#00C9A7', '#FFB800', '#FF3D71', '#1E86FF', '#8A3FFC', '#FA4D56', '#4589FF', '#A56EFF'];
const icons = ['💸', '👤', '💬', '🗞️', '📊', '⭐', '🔔', '📱', '📝', '📚'];

export async function GET() {
  try {
    // 从Sanity获取通知数据
    const query = groq`*[_type == "notification"] | order(createdAt desc) {
      name,
      description,
      time,
      _createdAt
    }`;
    
    const notifications = await client.fetch(query);
    
    // 为每个通知添加随机颜色和图标
    const processedNotifications = notifications.map((notification: any) => {
      return {
        ...notification,
        color: colors[Math.floor(Math.random() * colors.length)],
        icon: icons[Math.floor(Math.random() * icons.length)]
      };
    });
    
    return NextResponse.json(processedNotifications);
  } catch (error) {
    console.error('获取通知失败:', error);
    
    // 如果API失败，返回模拟数据
    const mockNotifications = [
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
      }
    ];
    
    return NextResponse.json(mockNotifications);
  }
} 