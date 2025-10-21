import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Kategorier (f.eks. Hijabs, Kjoler, Tilbehør)
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
});

// Produkter
export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  base_price: real('base_price').notNull(),
  category_id: integer('category_id').references(() => categories.id),
  image_url: text('image_url'),
  created_at: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Produkt-varianter (forskjellige farger/størrelser)
export const productVariants = sqliteTable('product_variants', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  product_id: integer('product_id').notNull().references(() => products.id),
  size: text('size'),
  color: text('color'),
  stock_quantity: integer('stock_quantity').notNull().default(0),
  price_adjustment: real('price_adjustment').default(0),
});

// Brukere
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  full_name: text('full_name'),
  created_at: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Ordre
export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  user_id: integer('user_id').references(() => users.id),
  total_amount: real('total_amount').notNull(),
  status: text('status').notNull().default('pending'),
  created_at: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  shipping_address: text('shipping_address'),
});

// Ordre-items (hvilke produkter i hver ordre)
export const orderItems = sqliteTable('order_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  order_id: integer('order_id').notNull().references(() => orders.id),
  product_id: integer('product_id').notNull().references(() => products.id),
  variant_id: integer('variant_id').references(() => productVariants.id),
  quantity: integer('quantity').notNull(),
  price_at_purchase: real('price_at_purchase').notNull(),
});