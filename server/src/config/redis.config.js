import { createClient } from 'redis'

// Initialize as null - application will work without Redis
let client = null;

// Check if REDIS_URL is defined and properly formatted
const redisUrl = process.env.REDIS_URL;
const isRedisConfigured = redisUrl && 
	(redisUrl.startsWith('redis://') || 
	 redisUrl.startsWith('rediss://'));

// Only try to create a Redis client if properly configured
if (isRedisConfigured) {
	try {
		client = createClient({
			url: redisUrl,
			socket: {
				reconnectStrategy: false // Don't auto-reconnect
			}
		});

		// Log errors but don't crash
		client.on('error', (err) => {
			console.log('Redis Client Error, continuing without Redis:', err.message);
			client = null;
		});
		
		client.on('connect', () => console.log('Connected to Redis'));
		
		// Don't connect right away - the app will connect when server starts
	} catch (error) {
		console.log('Redis initialization failed, continuing without Redis:', error.message);
		client = null;
	}
} else {
	console.log('Redis not properly configured, continuing without Redis');
}

export default client;
