// src/lib/db/drizzle.ts
import { neonConfig } from "@neondatabase/serverless";
import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from "@neondatabase/serverless";

// 直接使用Next.js自动加载的环境变量
const connectionString = process.env.DATABASE_URL || 'postgresql://messagewall_owner:npg_Hh5QMcyNOvm1@ep-shiny-butterfly-a4l9qkwp-pooler.us-east-1.aws.neon.tech/messagewall?sslmode=require';
if (!connectionString) {
  throw new Error("DATABASE_URL环境变量未设置，请在.env.local文件中添加");
}

// 创建连接池
const pool = new Pool({ connectionString });

// 如果在Edge Runtime环境中使用，需要此配置
if (process.env.NODE_ENV === "production") {
  neonConfig.fetchConnectionCache = true;
}

// 创建并导出drizzle实例
export const db = drizzle(pool);
