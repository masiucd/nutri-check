import {index, pgTable, serial, timestamp, varchar} from "drizzle-orm/pg-core";

export let user = pgTable(
  "users",
  {
    id: serial("id").primaryKey().notNull(),
    firstName: varchar("first_name", {length: 100}).notNull(),
    lastName: varchar("last_name", {length: 100}).notNull(),
    email: varchar("email", {length: 200}).notNull().unique(),
    password: varchar("password", {length: 200}).notNull(),
    createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
  })
);