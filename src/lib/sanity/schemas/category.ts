// schemas/category.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: '类别',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '名称',
      type: 'string',
      validation: (Rule) => Rule.required().error('类别名称为必填项')
    }),
    defineField({
      name: 'order',
      title: '排序',
      type: 'number',
      description: '用于控制类别的显示顺序'
    })
  ],
  preview: {
    select: {
      title: 'name'
    }
  }
})