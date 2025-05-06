import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// 定义公共路由
const isPublicRoute = createRouteMatcher([
    '/',            // 首页
    '/Messagewall', // 留言墙
    '/project',     // 项目
    '/articles(.*)', // 文章
    '/code',        // 留言墙页面(仅查看不留言)
    '/photo',       // 照片
    '/sign-in(.*)', // 登录
    '/sign-up(.*)', // 注册
    '/api/photos',
    '/api/notifications',  // 添加此API路径为公共路由
    // 其他你想设为公开的页面...
])

// 检查路径是否为管理员路径
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

// 自定义类型，包含元数据
interface CustomSessionClaims {
  metadata?: {
    siteOwner?: string;
    role?: string;
    [key: string]: any;
  };
}

// 使用clerkMiddleware
export default clerkMiddleware(async (auth, req) => {
  // 检查是否为管理员路径
  if (isAdminRoute(req)) {
    // 获取请求的认证信息
    const { userId, sessionClaims, redirectToSignIn } = await auth();
    
    // 确保用户已登录
    if (!userId) {
      console.log('未登录用户尝试访问管理页面');
      return redirectToSignIn();
    }
    
    // 使用类型断言安全访问元数据
    const metadata = (sessionClaims as CustomSessionClaims)?.metadata || {};
    const siteOwnerValue = metadata.siteOwner;
    
    // 检查用户是否有权限访问admin页面
    const isSiteOwner = siteOwnerValue === "true";
    
    console.log('用户ID:', userId);
    console.log('siteOwner值:', siteOwnerValue);
    console.log('是站点所有者?', isSiteOwner);
    
    if (!isSiteOwner) {
      // 用户无权访问，重定向到首页
      console.log(`用户尝试访问管理页面但被拒绝访问`);
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    console.log(`站点所有者成功访问管理页面`);
  } 
  // 处理其他受保护路由
  else if (!isPublicRoute(req)) {
    await auth.protect();
  }
})

// 配置中间件匹配器
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}