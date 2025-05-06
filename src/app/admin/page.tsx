"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconMessage,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

// 动态导入评论管理组件
const CommentManagement = dynamic(() => import('./comment/CommentManagement'), {
  loading: () => <p className="p-8">加载中...</p>
});

// 定义链接类型
interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  id: string;
}

function AdminPage() {
  // 添加currentPage状态来追踪当前选中的页面
  const [currentPage, setCurrentPage] = useState("dashboard");
  
  const links: NavLink[] = [
    {
      label: "Dashboard",
      href: "#dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      id: "dashboard"
    },
    {
      label: "评论管理",
      href: "#comments",
      icon: (
        <IconMessage className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      id: "comments"
    },
    {
      label: "用户管理",
      href: "#users",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      id: "users"
    },
    {
      label: "设置",
      href: "#settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      id: "settings"
    },
    {
      label: "返回首页",
      href: "/",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      id: "home"
    },
  ];
  const [open, setOpen] = useState(false);
  
  const Logo = () => {
    return (
      <a
        href="#"
        className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
      >
        <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium whitespace-pre text-black dark:text-white"
        >
          七禾页话后台
        </motion.span>
      </a>
    );
  };

  const LogoIcon = () => {
    return (
      <a
        href="#"
        className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
      >
        <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      </a>
    );
  };

  // 处理侧边栏点击事件
  const handleSidebarLinkClick = (id: string) => {
    if (id !== "home") {
      setCurrentPage(id);
    }
  };

  // Dashboard组件
  const Dashboard = () => {
    return (
      <div className="flex h-full w-full flex-1 flex-col gap-2 border-t md:border-t-0 md:border-l border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <div className="p-4 md:p-8">
          <h1 className="text-2xl font-bold">管理面板</h1>
          <p className="text-gray-500 mt-1">欢迎使用七禾页话管理系统</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:p-8">
          {[...new Array(4)].map((_, idx) => (
            <div
              key={"stat-card-" + idx}
              className="h-24 rounded-lg bg-gray-50 dark:bg-neutral-800 p-4 flex flex-col justify-between"
            >
              <div className="text-sm text-gray-500">统计数据 {idx + 1}</div>
              <div className="text-2xl font-bold">{Math.floor(Math.random() * 1000)}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-1 gap-4 p-4 md:p-8">
          <div className="w-full lg:w-2/3 rounded-lg bg-gray-50 dark:bg-neutral-800 p-4">
            <h3 className="font-medium mb-4">主要内容区域</h3>
            <div className="h-[calc(100%-2rem)] rounded-lg bg-white dark:bg-neutral-700"></div>
          </div>
          <div className="hidden lg:block w-1/3 rounded-lg bg-gray-50 dark:bg-neutral-800 p-4">
            <h3 className="font-medium mb-4">侧边信息</h3>
            <div className="space-y-4">
              {[...new Array(3)].map((_, idx) => (
                <div 
                  key={"side-item-" + idx}
                  className="h-24 rounded-lg bg-white dark:bg-neutral-700"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 用户管理组件
  const UserManagement = () => {
    return (
      <div className="flex h-full w-full flex-1 flex-col gap-2 border-t md:border-t-0 md:border-l border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <div className="p-4 md:p-8">
          <h1 className="text-2xl font-bold">用户管理</h1>
          <p className="text-gray-500 mt-1">管理网站用户</p>
        </div>
        <div className="p-4 md:p-8">
          <div className="rounded-lg bg-gray-50 dark:bg-neutral-800 p-6 h-[calc(100vh-200px)]">
            <p className="text-center text-gray-500">用户管理功能正在开发中...</p>
          </div>
        </div>
      </div>
    );
  };

  // 设置组件
  const Settings = () => {
    return (
      <div className="flex h-full w-full flex-1 flex-col gap-2 border-t md:border-t-0 md:border-l border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <div className="p-4 md:p-8">
          <h1 className="text-2xl font-bold">系统设置</h1>
          <p className="text-gray-500 mt-1">管理网站设置</p>
        </div>
        <div className="p-4 md:p-8">
          <div className="rounded-lg bg-gray-50 dark:bg-neutral-800 p-6 h-[calc(100vh-200px)]">
            <p className="text-center text-gray-500">设置功能正在开发中...</p>
          </div>
        </div>
      </div>
    );
  };
  
  // 根据当前页面状态返回对应组件
  const renderCurrentPage = () => {
    switch(currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "comments":
        return <CommentManagement />;
      case "users":
        return <UserManagement />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div
        className={cn(
          "flex w-full flex-1 flex-col overflow-hidden border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
          "h-screen",
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <div key={idx} onClick={() => handleSidebarLinkClick(link.id)}>
                    <SidebarLink 
                      link={link} 
                      className={currentPage === link.id ? "bg-gray-100 dark:bg-gray-800" : ""}
                    />
                  </div>
                ))}
              </div>
            </div>
            
          </SidebarBody>
        </Sidebar>
        {renderCurrentPage()}
      </div>
    </div>
  );
}

export default AdminPage;
