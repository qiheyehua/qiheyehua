import { defineField, defineType } from 'sanity'
import { z } from 'zod'

export const Story = z.object({
  _id: z.string(),
  quote: z.string(),
  name: z.string(),
  designation: z.string(),
  src: z.string().url(),
})

export type Story = z.infer<typeof Story>

export default defineType({
  name: 'story',
  title: '故事',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: '引用内容',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: '名字',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'designation',
      title: '职位/描述',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'src',
      title: '头像图片',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'designation',
      media: 'src',
    },
  },
}) 