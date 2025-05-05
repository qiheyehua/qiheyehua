import { defineField, defineType } from 'sanity'
import { z } from 'zod'

export const Testimonial = z.object({
  _id: z.string(),
  name: z.string(),
  designation: z.string().optional(),
  content: z.string()
})

export type Testimonial = z.infer<typeof Testimonial>

export default defineType({
  name: 'testimonial',
  title: '文案',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '姓名',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'designation',
      title: '职称',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: '内容',
      type: 'text',
      description: '推荐的内容，使用[[文本]]格式标记高亮文本，例如："这是一个[[重要]]的示例"',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'designation',
    },
  },
}) 