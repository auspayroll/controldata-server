const DeviceModel = require('./schemas').DeviceModel
const mongoose = require('mongoose');

module.exports.get = (req, res) => {
	const id = req.params.id
	return DeviceModel.findById(id)
	.then(doc => {
		if(doc){
			return res.status(200).json(doc)
		} else {
			throw 404
		}
	})
	.catch(err => {
		console.log(err)
		return res.status(err).json({error: err})
	})	
}

module.exports.update = (req, res) => {
	const id = req.params.id
	return DeviceModel.update({ _id: id}, { $set: req.body })
	.then(result => {
		return res.status(200).json({ _id: id });
	})
	.catch(err => {
		return res.status(err).json( { error: err })
	})
}

module.exports.all = (req, res) => {
	return DeviceModel.find()
	.then(devices => {
		const response = {
			count: devices.length,
			deviceModels: devices.map(x => {
				return { 
                    _id: x._id,
					name: x.name, 
					manufacturer: x.manufacturer, 
                    url: process.env.HOST + '/devices/' + x._id,
                    description: x.description
				 }
			})
		}
		return res.status(200).json(response)
	})
	.catch(err => {
		return res.status(err).json({error: err})
	})
}

module.exports.create = (req, res) => {
	request.body.user = request.user_id
    return DeviceModel.findOne({ name: req.body.name }).exec()
    .then(found => {
        if(!found){
			req.body._id = mongoose.Types.ObjectId()
            return new DeviceModel(req.body).save()
        }  else {
            throw {code: 409, id: found._id }
        }   
	})
	.then(saved => {
		return res.status(201).json(saved);
	})
	.catch(err => {
		if(err.code == 409){
			return res.status(err.code).json({ _id: err.id })
		} else {
			return res.status(err).json({error: err})
		}
	})
}

module.exports.delete = (req, res) => {
	console.log(req)
	return DeviceModel.findByIdAndRemove(req.body.id)
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

