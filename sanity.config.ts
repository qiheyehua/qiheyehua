import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/lib/sanity/schemas/index'
import { markdownSchema } from 'sanity-plugin-markdown/next'



export default defineConfig({
  name: 'qiheyehua-studio',
  title: '七禾页话 Studio',
  projectId: 'w04355b9',
  dataset: 'production',
  basePath: '/studio', // 匹配你的路由路径
  plugins: [structureTool(), markdownSchema(),visionTool()],
  schema: {
    types: schemaTypes,
  },
})
