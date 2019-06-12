const express = require('express')
const router = express.Router()
const guard = require('../middleware/auth')
const Measurements = require('../models/measurements')

//get an individual measurement
router.get('/device/:device_id/measurements/:id', guard, Measurements.get);

//get all measurements for a device
router.get('/device/:device_id/measurements', guard, Measurements.all)

//create a new measurement
router.post('/device/:device_id/measurements', guard, Measurements.create);

router.delete('/device/:device_id/measurements', guard, Measurements.delete);

module.exports = router
