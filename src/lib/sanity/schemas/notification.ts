import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'notification',
  title: '通知',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '标题',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '描述',
      type: 'string',
    }),
    defineField({
      name: 'time',
      title: '时间',
      type: 'string',
      description: '例如: 5分钟前, 1小时前',
    }),
    defineField({
      name: 'createdAt',
      title: '创建时间',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
  },
}); 