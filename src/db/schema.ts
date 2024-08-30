import { relations } from 'drizzle-orm'
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'

export const Store = pgTable('store', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	userId: varchar('userId', { length: 255 }).notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt').$onUpdate(() => new Date())
})

export const StoreRelations = relations(Store, ({ many }) => ({
	Store: many(BillBoard)
}))

export const createStoreSchema = createInsertSchema(Store)

export const BillBoard = pgTable('billboard', {
	id: uuid('id').defaultRandom().primaryKey(),
	storeId: uuid('storeId')
		.references(() => Store.id)
		.notNull(),
	label: varchar('label', { length: 255 }).notNull(),
	imageUrl: varchar('imageUrl', { length: 255 }).notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt').$onUpdate(() => new Date())
})

export const BillboardRelations = relations(BillBoard, ({ one }) => ({
	store: one(Store, { fields: [BillBoard.storeId], references: [Store.id] })
}))
