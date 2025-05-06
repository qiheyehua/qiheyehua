import { NextResponse } from "next/server";
import { deleteMessage } from "@/lib/db/queries";
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from "next/cache";

// 删除特定留言
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const user = await currentUser();
    
    // 检查用户是否已登录且有管理员权限
    // 注意：这里应该添加适当的权限检查，以确保只有管理员可以删除留言
    if (!user) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }
    
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: "无效的ID" }, { status: 400 });
    }
    
    const result = await deleteMessage(id);
    
    if (result.length === 0) {
      return NextResponse.json({ error: "留言不存在" }, { status: 404 });
    }
    
    // 重新验证留言墙页面
    revalidatePath("/Messagewall");
    revalidatePath("/admin");
    
    return NextResponse.json({ message: "留言已删除" }, { status: 200 });
  } catch (error) {
    console.error("删除留言失败:", error);
    return NextResponse.json({ error: "删除留言失败" }, { status: 500 });
  }
} 