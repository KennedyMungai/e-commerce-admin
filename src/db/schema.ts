import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const store = pgTable('store', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 255 }).notNull()
})
