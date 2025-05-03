import { db } from "./drizzle";
import { messages, type Message, type NewMessage } from "./schema";
import { eq, desc } from "drizzle-orm";

/**
 * 获取所有留言
 * 按日期降序排列（最新的在前）
 */
export async function getAllMessages(): Promise<Message[]> {
  return await db.select().from(messages).orderBy(desc(messages.date));
}

/**
 * 添加新留言
 * @param message 新留言数据
 */
export async function addMessage(message: NewMessage): Promise<Message[]> {
  return await db.insert(messages).values(message).returning();
}

/**
 * 根据ID删除留言
 * @param id 留言ID
 */
export async function deleteMessage(id: number): Promise<Message[]> {
  return await db.delete(messages).where(eq(messages.id, id)).returning();
}