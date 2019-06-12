const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const guard = require('../middleware/auth')

router.get('/:id', guard, Users.get)

router.put('/:id', guard, Users.update)

router.get('/', guard, Users.all)

router.delete("/:id", guard, Users.delete)

router.post('/', guard, Users.create)

module.exports = router
