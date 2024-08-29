import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const Store = pgTable('store', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	userId: varchar('userId', { length: 255 }).notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt').$onUpdate(() => new Date())
})

export const createStoreSchema = createInsertSchema(Store)