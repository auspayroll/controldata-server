const express = require('express')
const router = express.Router()
const DeviceModels = require('../models/deviceModels')

router.get('/:id', DeviceModels.get);

router.put('/:id', DeviceModels.update);

router.get('/', DeviceModels.all)

router.post('/', DeviceModels.create)

router.delete('/', DeviceModels.delete)

module.exports = router
