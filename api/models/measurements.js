const Device = require('./schemas').Device
const schemas = require('./schemas')
const mongoose = require('mongoose');


module.exports.get = (req, res) => {
	return Device.findById(req.params.device_id)
	.select('table')
	.exec()
	.then(device => {
		if(device){
			mongoose.connection.db.collection(device.table)
            .findById(req.params.id).then( measurement => {
				if(measurement){
					res.status(200).json(measurements)
				} else {
					throw 404
				}
            })
		} else {
			throw 404
		}
	})
	.catch(err => {
		return res.status(err).json({error: err})
	})	
}

module.exports.all = (req, res) => {
	return Device.findById(req.params.device_id)
	.then(device => {
		if(device){
            return mongoose.connection.db.collection("measurement_" + device._id.toString()).find().toArray()
        } else {
            throw 404
        }
	})
	.then( measurements => {
		return res.status(200).json(measurements)
	})
	.catch(err => {
		return res.status(err).json({error: err})
	})
}


module.exports.create = (req, res) => {
	return Device.findById(req.params.device_id)
	.populate('model').exec()
	.then(device =>{
		if(!device){
			throw 404
		} else {
			const tablename = "measurement_" + device._id.toString()
			const Measurement = mongoose.model('measurement', 
				schemas[device.model.schemaName], tablename)
			req.body._id =  mongoose.Types.ObjectId()
			req.body.device = device._id
			return new Measurement(req.body).save()
				.then(saved => {
					mongoose.connection.db.collection(tablename)
					.find().toArray()
					.then(measurements => {
						console.log(measurements)
						if(measurements.length > 2){
							measurements.sort((a,b) => a.ts - b.ts)
							var batch = { from: measurements[0].ts, 
								to: measurements[measurements.length-1].ts,
								m: measurements }
							mongoose.connection.db
							.collection(tablename)
							.insertOne(batch)
							.then(commandResult => {
								if(commandResult.result.ok == 1){
									console.log("---------**----------")
									var m_ids = measurements.m.map( measurement => { return measurement._id })
									mongoose.connection.db.collection(tablename).deleteMany({$in: m_ids})
									}
							})
							.catch(err => {

							})
						}
					})
					return saved
				})
				.catch(err => {
					throw 500
				})
        }     
	})
	.then(saved => {
		return res.status(201).json({ id: saved._id });
	})
	.catch(err => {
        return res.status(500).json({error: err})
	})
}


module.exports.delete = (req, res) => {
	return Device.findById(req.params.device_id)
	.exec()
	.then(device => {
		if(device){
			return mongoose.connection.db.collection("measurement_" + device._id.toString())
				.findOneAndDelete({ _id: req.body.id })
				        
		} else {
			throw 404
		}
	})
	.then(deleted => {
		if(deleted){
			return res.status(200).json(deleted)
		} 	
		else {
			throw 404
		}  
	})	
	.catch(err => {
		return res.status(err).json({error: err})
	})
		
}

