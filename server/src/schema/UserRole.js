const { uuid, pgTable, primaryKey } = require('drizzle-orm/pg-core')
const { User } = require('./User')
const { Role } = require('./Role')

const UserRole = pgTable(
	'user_role',
	{
		userId: uuid('userId')
			.references(() => User.userId)
			.notNull(),
		roleId: uuid('roleName')
			.references(() => Role.roleId)
			.notNull(),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.roleId, table.userId] }),
	}),
)

module.exports = { UserRole }
