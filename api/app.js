const express = require('express')
const app = express()
const morgan = require('morgan')
const deviceRoutes = require('./routes/devices')
const deviceModelRoutes = require('./routes/deviceModels')
const userRoutes = require('./routes/users')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const Users = require('./models/users')
const router = express.Router()

mongoose.connect(
	process.env.MONGO_HOST, { useNewUrlParser: true }
)

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization')
	if(req.method == 'OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'PUT, POST, GET')
		return res.status(200).json({})
	}
	next()
})

app.use('/devices', deviceRoutes);

app.use('/devicemodels', deviceModelRoutes);

app.use('/users', userRoutes);

router.post('/register', Users.create)

router.post('/login', Users.login)

router.get('/', (req, res) => { return res.status(200).json({ data: 'success'}) })

app.use(router)

app.use((req, res, next) => {
	const error = new Error('Not found')
	error.status = 404
	next(error)
})

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	})
})

module.exports = app;
