const Device = require('./schemas').Device
const DeviceModel = require('./schemas').DeviceModel
const mongoose = require('mongoose');
const uuid = require('uuid')

module.exports.all = (req, res) => {
	return Device.find()
	.populate('model')
	.then(devices => {
		const response = {
			count: devices.length,
			devices: devices.map(device => {
				return { 
					id: device._id, 
					serial: device.serial,
					model: device.model,
					description: device.description,
					url: process.env.HOST + '/devices/' + device._id
				}
			})
        }
        return res.status(200).json(response)

	})
	.catch(err => {
		console.log('here')
        return res.status(500).json({error: err})
    })  
}

module.exports.get = (req, res) => {
	const id = req.params.id
	return Device.findById(id)
	//.select('flow flow_u vel vel_')
	.populate('model')
	.exec()
	.then(doc => {
		if(doc){
            return res.status(200).json(doc)
		} else {
            throw 404
		}
	})
	.catch(err => {
        return res.status(err).json({error: err})
	})	
}

module.exports.update = (req, res) => {
	const id = req.params.id
	return Device.update({ _id: id}, { $set: req.body })
	.then(result => {
		return res.status(200).json({ _id: id });
	})
	.catch(err => {
		console.log(err)
		return res.status(500).json( { error: err })
	})
}

module.exports.create = (req, res) => {
	console.log('creating device')
	return DeviceModel.findById(req.body.model).exec()
	.then(model =>{
		if(!model){
			throw 404
		} else {
			return(model)
		}
	})
	.then(model => {
		req.body._id = mongoose.Types.ObjectId()
		req.body.model = model._id
		const device = new Device(req.body)
		return device.save()
	})
	.then(saved => {
		return res.status(201).json({ _id: saved._id });
	})
	.catch(err => {
		if(err == 404){
			return res.status(404).json({message: "Model not found"})
		} else {
			return res.status(500).json({error: err})
		}
	})
}

module.exports.delete = (req, res) => {
	return Device.findByIdAndRemove(req.body.id)
		.then(doc => {
			if(doc){
				return res.status(200).json(doc)
			} else {
				return res.status(404)
			}
		})
		.catch(err => {
			return res.status(500).json({ message: err})
		})
}

