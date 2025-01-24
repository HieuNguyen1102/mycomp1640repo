const { drizzle } = require('drizzle-orm/postgres-js')
const { config } = require('dotenv')
config()

const postgres = require('postgres')

const queryClient = postgres(process.env.DB_URL)

const db = drizzle(queryClient)

async function connectToDatabase() {
	try {
		await queryClient`SELECT 1`
		console.log('Connected to PostgreSQL')
	} catch (error) {
		console.error('Failed to connect to the database:', error)
	}
}

module.exports = { db, connectToDatabase }
