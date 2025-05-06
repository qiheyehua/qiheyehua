import { Metadata } from "next";
import { client } from "@/lib/sanity/lib/client";
import { ArticleView } from "@/components/article-view";

type ArticlePageParams = {
  params: {
    slug: string;
  };
}

// 动态生成页面元数据
export async function generateMetadata({ params }: ArticlePageParams): Promise<Metadata> {
  const { slug } = params;
  
  try {
    // 查询文章数据
    const article = await client.fetch(
      `*[_type == "article" && slug.current == $slug][0]`,
      { slug }
    );
    
    // 如果找到文章，则使用其标题作为页面标题
    if (article) {
      return {
        title: `${article.title} | 七禾页话`,
        description: article.excerpt || `阅读"${article.title}"文章`,
      };
    }
  } catch (error) {
    console.error("获取文章元数据失败:", error);
  }
  
  // 默认元数据，当找不到文章或发生错误时使用
  return {
    title: "文章详情 | 七禾页话",
    description: "阅读七禾页话的精彩文章内容",
  };
}

export default async function ArticlePage({ params }: ArticlePageParams) {
  const { slug } = params;
  
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <ArticleView slug={slug} />
    </div>
  );
} 