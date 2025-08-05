import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const webhooks = pgTable("webhooks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  url: text("url").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const embedFields = z.object({
  name: z.string(),
  value: z.string(),
  inline: z.boolean().default(false),
});

// Discord.js v2 Components
export const thumbnailData = z.object({
  url: z.string(),
});

export const sectionData = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  fields: z.array(embedFields).default([]),
  thumbnail: thumbnailData.optional(),
});

export const separatorData = z.object({
  spacing: z.enum(['Small', 'Medium', 'Large']).default('Medium'),
  divider: z.boolean().default(false),
});

export const containerData = z.object({
  accentColor: z.string().optional(),
  sections: z.array(sectionData).default([]),
  separators: z.array(separatorData).default([]),
});

export const embedData = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  fields: z.array(embedFields).default([]),
  image: z.string().optional(),
  timestamp: z.boolean().default(false),
  // Discord.js v2 Components
  useComponents: z.boolean().default(false),
  container: containerData.optional(),
});

export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  webhookId: varchar("webhook_id").references(() => webhooks.id),
  botUsername: text("bot_username").notNull(),
  avatarUrl: text("avatar_url"),
  embedData: jsonb("embed_data").$type<z.infer<typeof embedData>>(),
  status: text("status").notNull().default("pending"), // pending, sent, failed
  error: text("error"),
  sentAt: timestamp("sent_at").defaultNow(),
});

export const insertWebhookSchema = createInsertSchema(webhooks).omit({
  id: true,
  createdAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  sentAt: true,
});

export type InsertWebhook = z.infer<typeof insertWebhookSchema>;
export type Webhook = typeof webhooks.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
export type EmbedData = z.infer<typeof embedData>;
export type EmbedField = z.infer<typeof embedFields>;
export type ContainerData = z.infer<typeof containerData>;
export type SectionData = z.infer<typeof sectionData>;
export type SeparatorData = z.infer<typeof separatorData>;
export type ThumbnailData = z.infer<typeof thumbnailData>;
