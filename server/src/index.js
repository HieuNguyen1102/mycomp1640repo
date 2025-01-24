// Node.js body parsing middleware.
const bodyParser = require('body-parser')

// ExpressJS framework for HTTP server.
const express = require('express')
const app = express()

app.use(express.json())

// support parsing of application/json type post data.
app.use(bodyParser.json())

//support parsing of application/x-www-form-urlencoded post data.
app.use(bodyParser.urlencoded({ extended: true }))

// Server port.
const PORT = process.env.PORT || 5000

// CORS import.
const cors = require('cors')

// CORS policies.

app.use(
	cors({
		origin: JSON.parse(process.env.ALLOWED_HOSTS ?? '[]'),
		credentials: true,
	}),
)
app.enable('trust proxy')

// Uncomment these 2 lines if you want to start a cron job.
// Be sure to modify the function.
// const { task } = require('./utils/cronjob')
// task.start()

// Database connection import
const { connectToDatabase } = require('./config/db_config.js')
const client = require('./config/redis.config.js')

// Connect to the database first, then do everything else later
connectToDatabase()
	.then(async () => await client.connect())
	.then(() => {
		app.get('/', (req, res) => {
			res.status(200).json('Congratulations, your server is up and running!')
		})

		// Authentication

		// .......

		///////////////////////////////////
		// User functions
		// .......

		app.listen(PORT, () => console.log(`listening on port ${PORT}`))
	})
