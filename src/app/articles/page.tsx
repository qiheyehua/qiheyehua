import { ArticleList } from "@/components/article-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "文章列表 | 七禾页话",
  description: "浏览七禾页话的文章列表，包含各种精彩内容",
};

export default function ArticlesPage() {
  return <ArticleList />;
} 