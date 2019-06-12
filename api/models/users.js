const User = require('../models/schemas').User
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const process = { env: { JWT: 'secret'} }

module.exports.get = (req, res) => {
	return User.find({username: req.params.username})
	.then(doc => {
		if(doc.length > 0){
			return res.status(200).json(doc[0])
		} else {
			return res.status(404).json({message: "Not Found"})
		}
	})
	.catch(err => {
		console.log(err)
		return res.status(500).json({error: err})
	})	
}

module.exports.update = (req, res) => {
	const id = req.params.id
	return User.update({ _id: id}, { $set: req.body })
	.then(result => {
		return res.status(200).json(result);
	})
	.catch(err => {
		console.log(err)
		return res.status(500).json( { error: err })
	})
}

module.exports.all = (req, res) => {
	return User.find()
	.then(devices => {
		const response = {
			count: devices.length,
			users: devices.map(x => {
				return x
			})
		}
		console.log(response)
		return res.status(200).json(response)
	})
	.catch(err => {
		console.log(err)
		return res.status(500).json({error: err})
	})
}

module.exports.delete = (req, res) => {
    console.log(req.body.username)
    return User.remove({ username: req.body.username}).exec()
    .then(response => {
        return res.status(200).json({
            message: 'User delete'
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({
            message: err
        })
    })
}

module.exports.create = (req, res) => {
    return User.findOne({ username: req.body.username}).exec()
    .then(found => {
        if(!found){
            console.log(req.body.password)
            console.log(bcrypt)
            return bcrypt.hash(req.body.password, 10)
        } else {
            throw 409
        }  
    })
    .then(hash => {
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            username: req.body.username, 
            password: hash,
            key: req.body.key
        })
        return user.save()
    })
    .then(user => {
        token = jwt.sign({ user_id: user._id }, process.env.JWT,  { expiresIn: '1h' })
        localToken = jwt.sign({ user_id: user._id }, user.key,  { expiresIn: '1h' })
        return res.status(201).json({ id: user._id, token, localToken })
    })
    .catch(err => {
        console.log(err)
        if(err == 409){
            return res.status(409).json({error: 'User already exists'})
        } else {
            return res.status(500).json({error: err})
        }
	})
}

module.exports.login = (req, res) => {
    var user 
    return User.findOne({ username: req.body.username}).exec()
    .then(found => {
        user = found
        if(user){
            return bcrypt.compare(req.body.password, user.password)
        } else {
            throw 401
        }     
    })   
    .then(result => {
        if(result){
            token = jwt.sign({ user_id: user._id }, process.env.JWT,  { expiresIn: '1h' })
            localToken = jwt.sign({ user_id: user._id }, user.key,  { expiresIn: '1h' })
            console.log("token key on server " + user.key)
            return res.status(200).json({
                message: 'Authorized', 
                token,
                localToken
            })
        } else {
            throw 401
        }
    })
    .catch(err=> {
        console.log(err)
        return res.status(401).json({
            message: 'Unauthorized'
        })
    })
}