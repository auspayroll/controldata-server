const express = require('express')
const router = express.Router()
const guard = require('../middleware/auth')
const Devices = require('../models/devices')
const Measurements = require('../models/measurements')

router.get('/:id', guard, Devices.get);

router.put('/:id', guard, Devices.update);

router.get('/', guard, Devices.all)

router.post('/', guard, Devices.create);

router.delete('/', guard, Devices.delete);

//get an individual measurement
router.get('/:device_id/measurements/:id', guard, Measurements.get);

//get all measurements for a device
router.get('/:device_id/measurements', guard, Measurements.all)

//create a new measurement
router.post('/:device_id/measurements', guard, Measurements.create);

router.delete('/:device_id/measurements', guard, Measurements.delete);

module.exports = router

