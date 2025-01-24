const { uuid, pgTable, primaryKey } = require('drizzle-orm/pg-core')
const { Role } = require('./Role')
const { Permission } = require('./Permission')

const RolePermission = pgTable(
	'role_permission',
	{
		roleId: uuid('roleId')
			.references(() => Role.roleId)
			.notNull(),
		permissionId: uuid('permissionId')
			.references(() => Permission.permissionId)
			.notNull(),
	},
	// Define a composite primary key using both columns
	(table) => ({
		pk: primaryKey({ columns: [table.roleId, table.permissionId] }),
	}),
)

module.exports = { RolePermission }
