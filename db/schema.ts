import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contentItems = sqliteTable("content_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  collection: text("collection").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  status: text("status").notNull().default("draft"),
  verificationStatus: text("verification_status").notNull().default("pending"),
  payload: text("payload", { mode: "json" }).notNull(),
  reviewAt: integer("review_at", { mode: "timestamp" }),
  publishAt: integer("publish_at", { mode: "timestamp" }),
  createdBy: text("created_by"),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const submissions = sqliteTable("submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  kind: text("kind").notNull(),
  name: text("name"),
  email: text("email").notNull(),
  organisation: text("organisation"),
  telephone: text("telephone"),
  message: text("message"),
  consent: integer("consent", { mode: "boolean" }).notNull(),
  status: text("status").notNull().default("new"),
  owner: text("owner"),
  internalNotes: text("internal_notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const newsletterSubscribers = sqliteTable("newsletter_subscribers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  consent: integer("consent", { mode: "boolean" }).notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name"),
  role: text("role").notNull().default("visitor"),
  newsletterOptIn: integer("newsletter_opt_in", { mode: "boolean" }).notNull().default(false),
  accessibilityPreferences: text("accessibility_preferences"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const savedItems = sqliteTable("saved_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userEmail: text("user_email").notNull(),
  contentSlug: text("content_slug").notNull(),
  itineraryDay: integer("itinerary_day"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const auditLogs = sqliteTable("audit_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  actor: text("actor").notNull(),
  action: text("action").notNull(),
  collection: text("collection").notNull(),
  recordId: text("record_id").notNull(),
  detail: text("detail"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});
