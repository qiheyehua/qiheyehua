"use client";

import { useState } from "react";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";
import { File, Folder, Tree } from "@/components/magicui/file-tree";
import { ScriptCopyBtn } from "@/components/magicui/script-copy-btn";
import { CodeBlock } from "@/components/ui/code-block";

const ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "app",
        children: [
          {
            id: "3",
            isSelectable: true,
            name: "layout.tsx",
          },
          {
            id: "4",
            isSelectable: true,
            name: "page.tsx",
          },
        ],
      },
      {
        id: "5",
        isSelectable: true,
        name: "components",
        children: [
          {
            id: "6",
            isSelectable: true,
            name: "header.tsx",
          },
          {
            id: "7",
            isSelectable: true,
            name: "footer.tsx",
          },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "lib",
        children: [
          {
            id: "9",
            isSelectable: true,
            name: "utils.ts",
          },
        ],
      },
    ],
  },
];

// 示例代码内容
const fileContents = {
  "layout.tsx": {
    filename: "layout.tsx",
    language: "tsx",
    code: `import Navbar from "@/components/Navbar";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: 'Qiheyehua website | 七禾页话',
  description: 'Full Stack Developer Portfolio',
  icons: {
    icon: '/favicon1.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="zh-CN">
        <body>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}`,
    highlightLines: [3, 18, 21, 22, 23],
  },
  "page.tsx": {
    filename: "page.tsx",
    language: "tsx",
    code: `import { Suspense } from "react";
import Loading from "./loading";
import HeroSection from "@/components/HeroSection";
import Projects from "@/components/Projects";
import CaseStudy from "@/components/CaseStudy";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<Loading />}>
        <HeroSection />
        <Projects />
        <CaseStudy />
      </Suspense>
    </div>
  );
}`,
    highlightLines: [1, 10, 11, 12, 13],
  },
  "header.tsx": {
    filename: "components/header.tsx",
    language: "tsx",
    code: `'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navLinks } from '@/app/data/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          七禾页话
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-gray-700 hover:text-black">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">打开菜单</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-gray-700 hover:text-black block py-2">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}`,
    highlightLines: [3, 7, 8, 29, 30, 39],
  },
  "footer.tsx": {
    filename: "components/footer.tsx",
    language: "tsx",
    code: `import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-bold">
              七禾页话
            </Link>
            <p className="mt-2 text-gray-600">
              Full Stack Developer Portfolio
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h3 className="font-medium mb-2">联系方式</h3>
              <ul className="space-y-2">
                <li><a href="mailto:example@example.com" className="text-gray-600 hover:text-black">Email</a></li>
                <li><a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">GitHub</a></li>
                <li><a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">LinkedIn</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">导航</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-600 hover:text-black">首页</Link></li>
                <li><Link href="/projects" className="text-gray-600 hover:text-black">项目</Link></li>
                <li><Link href="/articles" className="text-gray-600 hover:text-black">文章</Link></li>
                <li><Link href="/about" className="text-gray-600 hover:text-black">关于</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>© {currentYear} 七禾页话. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}`,
    highlightLines: [4, 43, 44],
  },
  "utils.ts": {
    filename: "lib/utils.ts",
    language: "typescript",
    code: `// 格式化日期
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// 计算阅读时间
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200; // 假设平均阅读速度每分钟200字
  const wordCount = content.trim().split(/\\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return \`\${readingTime} 分钟阅读\`;
}

// 截断文本
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return \`\${text.substring(0, maxLength)}...\`;
}

// 生成随机ID
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`,
    highlightLines: [2, 12, 21, 29, 40],
  },
};

export default function CodePage() {
  // 状态管理：当前选中的文件ID和文件内容
  const [selectedFileId, setSelectedFileId] = useState<string | null>("3"); // 默认选中layout.tsx
  const [selectedFileContent, setSelectedFileContent] = useState(fileContents["layout.tsx"]);

  // Spring Boot相关命令
  const springBootCommandMap = {
    mvn: "mvn spring-boot:run",
    gradle: "gradle bootRun",
    intellij: "点击运行按钮",
    cli: "java -jar target/myapp.jar",
  };
  
  // Vue相关命令
  const vueCommandMap = {
    npm: "npm create vue@latest",
    yarn: "yarn create vue",
    pnpm: "pnpm create vue@latest",
    bun: "bun create vue@latest",
  };

  // 处理文件选择
  const handleFileSelect = (id: string) => {
    setSelectedFileId(id);
    
    // 根据ID选择对应的文件内容
    switch (id) {
      case "3":
        setSelectedFileContent(fileContents["layout.tsx"]);
        break;
      case "4":
        setSelectedFileContent(fileContents["page.tsx"]);
        break;
      case "6":
        setSelectedFileContent(fileContents["header.tsx"]);
        break;
      case "7":
        setSelectedFileContent(fileContents["footer.tsx"]);
        break;
      case "9":
        setSelectedFileContent(fileContents["utils.ts"]);
        break;
      default:
        // 如果点击的是其他文件，显示默认内容
        setSelectedFileContent(fileContents["layout.tsx"]);
        break;
    }
  };
  
  return (
    <section className="relative w-full px-4 py-2 md:py-8 overflow-hidden">
      <div className="container mx-auto">
        {/* 第一行：两个终端并排 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* 第一个终端 - Spring Boot */}
          <div className="flex flex-col">
            <Terminal>
              <TypingAnimation>&gt; mvn archetype:generate -D搞快点=true 🚀</TypingAnimation>

              <AnimatedSpan delay={1500} className="text-yellow-500">
                <span>✔ 检测到祖传JDK 1.8，正在注入咖啡因... ☕</span>
              </AnimatedSpan>

              <AnimatedSpan delay={2000} className="text-green-500">
                <span>✔ 捕获野生Spring Boot！版本号：3.1.6 🌱</span>
              </AnimatedSpan>

              <AnimatedSpan delay={2500} className="text-blue-500">
                <span>ℹ 正在召唤Maven中央仓库... 网络波动防御结界展开！🛡️</span>
              </AnimatedSpan>

              <AnimatedSpan delay={3000} className="text-green-500">
                <span>✔ pom.xml生成完毕，依赖地狱已预订 🔥</span>
              </AnimatedSpan>

              <AnimatedSpan delay={3500} className="text-purple-500">
                <span>⚡ 静态代码块正在加载祖传配置... 📜</span>
              </AnimatedSpan>

              <AnimatedSpan delay={4000} className="text-green-500">
                <span>✔ 自动生成Application.java：/src/main/java/com/example/demo ⚙️</span>
              </AnimatedSpan>

              <AnimatedSpan delay={4500} className="text-yellow-500">
                <span>⚠️ 检测到循环依赖！正在尝试甩锅给设计模式... 🚮</span>
              </AnimatedSpan>

              <AnimatedSpan delay={5000} className="text-green-500">
                <span>✔ 数据库连接池已就绪：最大连接数=熬夜加班天数 🛌</span>
              </AnimatedSpan>

              <AnimatedSpan delay={5500} className="text-blue-500">
                <span>💡 奥利给！生成神秘文件：</span>
                <span className="pl-2">- src/main/resources/application.yml（包含宇宙终极答案）</span>
              </AnimatedSpan>

              <TypingAnimation delay={6000} className="text-purple-500">
                [INFO] 编译进度：[|||||| 60%] 遇到警告，但问题不大 🤷
              </TypingAnimation>

              <TypingAnimation delay={6500} className="text-green-500">
                BUILD SUCCESS 总耗时 5分13秒（含3分半下载依赖）
              </TypingAnimation>

              <TypingAnimation delay={7000} className="text-yellow-500">
                ⚠️ 温馨提示：记得删除永远用不到的@Deprecated注释
              </TypingAnimation>
            </Terminal>
            <div className="flex flex-col space-y-6 mt-3 mb-6 mx-4">
              <ScriptCopyBtn
                showMultiplePackageOptions={true}
                codeLanguage="shell"
                lightTheme="nord"
                darkTheme="vitesse-dark"
                commandMap={springBootCommandMap}
              />
            </div>
          </div>

          {/* 第二个终端 - Vue */}
          <div className="flex flex-col">
            <Terminal>
              <TypingAnimation>&gt; npm create vue@latest my-vue-app 🚀</TypingAnimation>

              <AnimatedSpan delay={1500} className="text-green-500">
                <span>✔ Vue CLI v5.0.8 初始化中...</span>
              </AnimatedSpan>

              <AnimatedSpan delay={2000} className="text-blue-500">
                <span>💡 Vue项目配置向导已启动</span>
              </AnimatedSpan>

              <AnimatedSpan delay={2500} className="text-yellow-500">
                <span>? 是否使用TypeScript? ... 是</span>
              </AnimatedSpan>

              <AnimatedSpan delay={3000} className="text-yellow-500">
                <span>? 是否使用JSX? ... 否</span>
              </AnimatedSpan>

              <AnimatedSpan delay={3500} className="text-yellow-500">
                <span>? 是否使用Vue Router? ... 是</span>
              </AnimatedSpan>

              <AnimatedSpan delay={4000} className="text-yellow-500">
                <span>? 是否使用Pinia状态管理? ... 是</span>
              </AnimatedSpan>

              <AnimatedSpan delay={4500} className="text-yellow-500">
                <span>? 是否使用Vitest单元测试? ... 否</span>
              </AnimatedSpan>

              <AnimatedSpan delay={5000} className="text-yellow-500">
                <span>? 是否使用ESLint代码检查? ... 是</span>
              </AnimatedSpan>

              <AnimatedSpan delay={5500} className="text-green-500">
                <span>✅ 正在为项目安装依赖... 这可能需要几分钟 ⏳</span>
              </AnimatedSpan>

              <TypingAnimation delay={6000} className="text-blue-500">
                [INFO] 项目依赖安装中，进度：[████████████████] 90%
              </TypingAnimation>

              <TypingAnimation delay={6500} className="text-green-500">
                ✅ 成功创建项目 my-vue-app！
              </TypingAnimation>

              <TypingAnimation delay={7000} className="text-yellow-500">
                🎮 开始使用：
                cd my-vue-app 
                npm run dev
              </TypingAnimation>
            </Terminal>
            <div className="flex flex-col space-y-6 mt-3 mb-6 mx-4">
              <ScriptCopyBtn
                showMultiplePackageOptions={true}
                codeLanguage="shell"
                lightTheme="nord"
                darkTheme="vitesse-dark"
                commandMap={vueCommandMap}
              />
            </div>
          </div>
        </div>

        {/* 第二行：文件树和代码展示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {/* 左侧文件树 */}
          <div className="md:col-span-1">
            <Tree
              className="overflow-hidden rounded-md bg-background p-2"
              initialSelectedId={selectedFileId || "3"}
              initialExpandedItems={[
                "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                "11", "12", "13", "14", "15",
              ]}
              elements={ELEMENTS}
            >
              <Folder element="qiheyehua" value="1">
                <Folder value="2" element="src">
                  <Folder value="3" element="main" isSelectable={true}>
                    <File value="3" isSelect={selectedFileId === "3"} onClick={() => handleFileSelect("3")}>
                      <p>layout.tsx</p>
                    </File>
                    <File value="4" isSelect={selectedFileId === "4"} onClick={() => handleFileSelect("4")}>
                      <p>page.tsx</p>
                    </File>
                    <Folder value="5" element="components">
                      <File value="6" isSelect={selectedFileId === "6"} onClick={() => handleFileSelect("6")}>
                        <p>header.tsx</p>
                      </File>
                      <File value="7" isSelect={selectedFileId === "7"} onClick={() => handleFileSelect("7")}>
                        <p>footer.tsx</p>
                      </File>
                    </Folder>
                    <Folder value="8" element="lib">
                      <File value="9" isSelect={selectedFileId === "9"} onClick={() => handleFileSelect("9")}>
                        <p>utils.ts</p>
                      </File>
                    </Folder>
                  </Folder>
                </Folder>
              </Folder>
            </Tree>
          </div>
          
          {/* 右侧代码展示 */}
          <div className="md:col-span-2">
            <CodeBlock
              language={selectedFileContent.language}
              filename={selectedFileContent.filename}
              highlightLines={selectedFileContent.highlightLines}
              code={selectedFileContent.code}
            />
          </div>
        </div>
      </div>
    </section>
  );
}