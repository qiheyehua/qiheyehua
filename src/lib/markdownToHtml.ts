import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkPrism from 'remark-prism';

/**
 * 将Markdown文本转换为HTML
 * @param markdown Markdown格式的文本
 * @returns 转换后的HTML字符串
 */
export default async function markdownToHtml(markdown: string): Promise<string> {
  // 使用remark处理Markdown
  const result = await remark()
    // 支持GitHub风格的Markdown (表格、任务列表等)
    .use(remarkGfm)
    // 代码语法高亮
    .use(remarkPrism)
    // 转换为HTML
    .use(html, { sanitize: false })
    .process(markdown);
    
  return result.toString();
} 