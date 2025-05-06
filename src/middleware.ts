import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
    '/',            // 首页
    '/Messagewall',//留言墙
     '/project',//项目
     '/articles(.*)',//文章
     '/code',    // 留言墙页面(仅查看不留言)
     '/photo',//照片
    '/sign-in(.*)',//登录
    '/sign-up(.*)',//注册
    // 其他你想设为公开的页面...
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}