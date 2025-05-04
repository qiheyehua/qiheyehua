import { defineField, defineType } from 'sanity'
import { z } from 'zod'

export const Photo = z.object({
  _id: z.string(),
  title: z.string(),
  image: z.object({
    _ref: z.string(),
    asset: z.any(),
  }),
  className: z.string().optional(),
})

export type Photo = z.infer<typeof Photo>

export default defineType({
  name: 'photo',
  title: '照片',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '标题',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: '图片',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'className',
      title: '样式类名',
      type: 'string',
      description: '用于控制照片在页面上的位置和旋转角度',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})