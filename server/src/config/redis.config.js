const { createClient } = require('redis')
const { config } = require('dotenv')
config()

const client = createClient({
	url: process.env.REDIS_URL,
})

client.on('error', (err) => console.log('Redis Client Error', err))
client.on('connect', () => console.log('Connected to Redis'))

module.exports = client
