import React from 'react';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { client } from '@/lib/sanity/lib/client';
import { Meteors } from "@/components/magicui/meteors";
// 获取所有项目
async function getAllProjects() {
  const query = `
    *[_type == "project"] {
      _id,
      name,
      url,
      description,
      "iconUrl": icon.asset->url,
      _createdAt
    } | order(_createdAt desc)
  `;
  const data = await client.fetch(query);
  
  return data;
}

// 定义项目数据类型
interface Project {
  _id: string;
  name: string;
  url: string;
  description: string;
  iconUrl?: string;
  _createdAt: string;
}

// 获取URL的主机名，带有错误处理
function getHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch (error) {
    // 如果URL不合法，返回原始链接或空字符串
    return url.replace(/^https?:\/\//, '').split('/')[0] || '访问项目';
  }
}

// 将组件转换为异步组件
const WhiteModule = async () => {
  // 从Sanity获取真实项目数据
  const projects = await getAllProjects();
  
  //硬编码测试数据（如果Sanity接口不可用）
  const fallbackProjects: Project[] = [
    {
      _id: "19d1e029-16dc-4b7f-8208-d9ddb7823502",
      name: "在线简历展示",
      url: "https://cali.so/projects",
      description: "通过这个网站可以展示你的项目经历以及技能展示",
      iconUrl: "https://cdn.sanity.io/images/w04355b9/production/5cc00e58b80c85ea508a6809f7897baa3ba883c5-1080x1080.jpg",
      _createdAt: "2025-04-30T06:57:43Z"
    }
  ];

  // 使用Sanity数据或回退到测试数据
  const displayProjects = projects && projects.length > 0 ? projects : fallbackProjects;

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayProjects.map((project: Project, index: number) => (
            <CardContainer key={project._id} className="w-full">
              <CardBody className="h-auto w-full rounded-xl border border-gray-200 shadow-sm bg-white relative">
                {/* 流星背景效果 */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <Meteors number={8} />
                </div>
                
                {/* 头像放在左上角 */}
                <CardItem
                  translateZ="80"
                  className="absolute top-4 left-4 z-10"
                >
                  {project.iconUrl ? (
                    <img
                      src={project.iconUrl}
                      alt={project.name}
                      className="w-12 h-12 object-contain rounded-full border-2 border-white shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm">
                      <span className="text-lg font-bold text-gray-600">
                        {project.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </CardItem>
                
                {/* 内容区域带上边距，为头像留出空间 */}
                <CardItem translateZ="60" className="px-5 py-4 pt-20">
                  <h3 className="text-lg font-bold mb-1.5">{project.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <CardItem
                    as="a"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    translateZ="80"
                    className="flex items-center text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {getHostname(project.url)}
                    <span className="ml-1" aria-hidden="true">↗</span>
                  </CardItem>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhiteModule; 