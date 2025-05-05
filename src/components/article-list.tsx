"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/lib/sanity/lib/client";
import Link from "next/link";
import { FollowerPointerCard } from "@/components/ui/following-pointer";

interface Article {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author?: string;
  mainImage?: string;
  publishedAt?: string;
  
  categories?: string[];
  readingTime?: number;
}
const blogContent = {
  author: "七禾页话",
  date: "2025-05-05",
  authorAvatar: "https://res.cloudinary.com/dqsej8eol/image/upload/v1746436318/zr2pmsvh7w34sznffvbu.jpg",
};
 
const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex items-center space-x-2">
    <img
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);

export function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        // 查询所有文章，按发布日期降序排列
        const query = `*[_type == "article"] | order(publishedAt desc) {
          _id,
          categories,
          title,
          slug,
          author,
          "mainImage": mainImage.asset->url,
          publishedAt,
       
          "readingTime": round(length(content) / 500)
        }`;
        
        const result = await client.fetch(query);
        
        if (result && result.length > 0) {
          console.log("获取的文章数据:", result);
          setArticles(result);
        }
      } catch (error) {
        console.error("获取文章列表失败:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);
  

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="animate-pulse space-y-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border-b pb-8">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">暂无文章</h2>
        <p>稍后再来查看吧</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    } catch (error) {
      console.error("日期格式化错误:", error);
      return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-12 text-center">文章列表</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FollowerPointerCard
        title={
          <TitleComponent
            title={blogContent.author}
            avatar={blogContent.authorAvatar}
          />
        }
      >
        {articles.map((article) => (
          <Link 
            href={`/articles/${article.slug.current}`}
            key={article._id}
            className="block group"
          >
            <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xs transition-all duration-300 hover:shadow-md group-hover:border-blue-100">
              {article.mainImage && (
                <img
                  src={article.mainImage}
                  alt={article.title}
                  className="h-56 w-full object-cover"
                />
              )}

              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>

                <div className="flex flex-wrap items-center text-xs text-gray-500 gap-4 mt-2">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{article.publishedAt ? formatDate(article.publishedAt) : '未发布'}</span>
                  </div>

                  {article.categories && article.categories.length > 0 && (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span>{article.categories.join(", ")}</span>
                    </div>
                  )}

                  {article.readingTime && (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{article.readingTime}分钟阅读</span>
                    </div>
                  )}
                </div>
                
              
                <div className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-gray-900">
                  阅读更多
                  <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                    &rarr;
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
        </FollowerPointerCard>
      </div>
    </div>
  );
}

export default ArticleList;