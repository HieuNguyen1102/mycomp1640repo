const { uuid, text, pgTable, primaryKey } = require('drizzle-orm/pg-core')

const Permission = pgTable('permission', {
	permissionId: uuid('permissionId').defaultRandom().primaryKey(),
	permissionName: text('permissionName').notNull(),
	description: text('description'),
})

module.exports = { Permission }
