import { NextResponse } from "next/server";
import { getAllMessages, addMessage } from "@/lib/db/queries";
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from "next/cache";

// 获取所有留言
export async function GET() {
  try {
    const messages = await getAllMessages();
    return NextResponse.json(messages);
  } catch (error) {
    console.error("获取留言失败:", error);
    return NextResponse.json({ error: "获取留言失败" }, { status: 500 });
  }
}

// 添加新留言
export async function POST(request: Request) {
  try {
    const user = await currentUser();
    console.log('用户名:', user?.username);
    
    // 检查用户是否已登录
    if (!user) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }
    
    const { content } = await request.json();
    
    // 验证留言内容
    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json({ error: "留言内容不能为空" }, { status: 400 });
    }
    
    // 添加新留言
    const newMessage = {
      username: user.firstName || `user_${user.id.substring(0, 8)}`,
      content: content.trim(),
      avatar: user.imageUrl || `https://avatar.vercel.sh/${user.id.substring(0, 8)}`,
      // date字段会自动设置为当前时间
    };
    
    const result = await addMessage(newMessage);
    
    // 重新验证留言墙页面
    revalidatePath("/Messagewall");
    
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("添加留言失败:", error);
    return NextResponse.json({ error: "添加留言失败" }, { status: 500 });
  }
}