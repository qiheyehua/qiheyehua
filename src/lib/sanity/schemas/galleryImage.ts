// schemas/galleryImage.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: '图片',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '标题',
      type: 'string',
      validation: (Rule) => Rule.required().error('图片标题为必填项')
    }),
    defineField({
      name: 'description',
      title: '描述',
      type: 'text',
      description: '图片的详细描述'
    }),
    defineField({
      name: 'image',
      title: '图片',
      type: 'image',
      options: {
        hotspot: true, // 支持裁剪和焦点设置
      },
      fields: [
        {
          name: 'alt',
          title: '替代文本',
          type: 'string',
          description: '图片的描述性文本，用于无障碍访问'
        }
      ],
    }),
    defineField({
      name: 'url',
      title: '外部图片URL',
      type: 'url',
      description: '可选：如果使用外部图片（如Cloudinary URL）而不是上传到Sanity，请提供URL'
    }),
    defineField({
      name: 'category',
      title: '所属类别',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required().error('必须选择一个类别')
    }),
    defineField({
      name: 'order',
      title: '排序',
      type: 'number',
      description: '用于控制图片在类别中的显示顺序'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.name',
      media: 'image'
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title,
        subtitle: subtitle ? `类别: ${subtitle}` : '未分类',
        media: media
      }
    }
  }
})