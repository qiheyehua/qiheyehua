import { defineField, defineType } from 'sanity'
import { z } from 'zod'

export const Article = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.object({ current: z.string() }),
  author: z.string().optional(),
  mainImage: z.object({
    _ref: z.string(),
    asset: z.any(),
  }).optional(),
  categories: z.array(z.string()).optional(),
  publishedAt: z.string().optional(),
  content: z.string(),  // Markdown内容
})

export type Article = z.infer<typeof Article>

export default defineType({
  name: 'article',
  title: '文章',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '标题',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '链接',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: '作者',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: '主图',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: '分类',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'publishedAt',
      title: '发布日期',
      type: 'datetime',
    }),
    defineField({
      name: 'content',
      title: '内容',
      type: 'markdown',  // 使用markdown类型
      description: '使用Markdown格式编写文章内容',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author ? `作者: ${author}` : '' }
    },
  },
})