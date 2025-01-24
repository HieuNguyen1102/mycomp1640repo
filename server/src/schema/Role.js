const { uuid, text, pgTable, primaryKey } = require('drizzle-orm/pg-core')

const Role = pgTable('role', {
	roleId: uuid('roleId').defaultRandom().primaryKey(),
	roleName: text('roleName').notNull(),
	description: text('description'),
})

module.exports = { Role }
