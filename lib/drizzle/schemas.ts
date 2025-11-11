import {
  pgTable,
  serial,
  varchar,
  timestamp,
  date,
  time,
  integer,
  text,
  decimal,
} from 'drizzle-orm/pg-core'

// 1️ User Profiles Table
export const user_profiles = pgTable('user_profiles', {
  id: serial('id').primaryKey(),
  full_name: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
})

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
  image: varchar('image', { length: 500 }),
  created_at: timestamp('created_at').defaultNow(),
})
