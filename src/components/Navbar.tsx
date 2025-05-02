'use client';  // 这行必须放在文件最顶部

import { useState } from 'react';
import Link from 'next/link';
import { navLinks, socialLinks } from '@/app/data/navigation';
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

export function InteractiveHoverButtonDemo() {
  return <InteractiveHoverButton>Hover Me</InteractiveHoverButton>;
}


export default function Navbar() {
  // 添加状态管理
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 处理菜单点击
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-[2px] bg-gradient-to-b from-gray-100 to-gray-100/0 border-b border-b-gray-300/10 py-4">
      <div className="max-w-[1800px] mx-auto px-8">
        <div className="flex items-center justify-between">
          {/* 左侧 Logo + 导航链接组合 */}
          <div className="flex items-center">
            {/* Logo */}
            <Link
              href="/"
              className="hidden lg:block font-fantasy text-2xl text-[#334155] mr-8"
            >
              Qiheyehua
            </Link>
            {/* 导航链接 - 大屏幕 */}
            <nav className="hidden lg:flex items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={`/${link.href === 'works' ? '' : link.href}`}
                  className={`flex items-center gap-x-1 text-[#334155] hover:text-[#1f2937] transition-colors mr-8`}
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* 右侧图标和汉堡菜单 */}
          <div className="flex items-center">
            <div className="flex items-center">
              {socialLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[#334155] hover:text-[#1f2937] transition-colors ${
                    index !== socialLinks.length - 1 ? 'mr-6' : ''
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            {/* 登录按钮和用户头像 */}
            <div className="flex items-center space-x-4">
              {/* 未登录时显示登录按钮 */}
              <SignedOut>
                <SignInButton mode="modal" forceRedirectUrl="/">
                <InteractiveHoverButton>登录</InteractiveHoverButton>
                </SignInButton>
              </SignedOut>
              {/* 登录后显示用户头像 */}
              <SignedIn>
                <UserButton 
                  afterSignOutUrl="/"
                  userProfileMode="navigation"
                  userProfileUrl="/profile"
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10"
                    }
                  }}
                />
              </SignedIn>
            </div>

            {/* 汉堡菜单按钮 */}
            <button 
              onClick={toggleMenu}
              className="lg:hidden ml-6 p-2 text-[#334155] hover:text-[#1f2937] transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 移动端导航菜单 */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <nav className="mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={`/${link.href === 'works' ? '' : link.href}`}
                  className="flex items-center gap-x-1 text-[#334155] hover:text-[#1f2937] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        
      </div>
    </header>
  );
} 