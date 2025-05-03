import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * 留言表定义
 * 包含留言id、用户名、留言内容、头像URL和日期
 */
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  content: text("content").notNull(),
  avatar: text("avatar"),
  date: timestamp("date").defaultNow().notNull(),
});

// 留言表类型定义
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;