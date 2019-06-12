const Device = require('../models/flowmeter').Device
const Measurement = require('../models/flowmeter').FlowMeter
const mongoose = require('mongoose')

/*
async function createMeasurement(measurement){
    return Device.findById(measurement.model).exec()
	.then(device =>{
		if(!device){
			throw 404
		} else {
            const Measurement = mongoose.model(device.model.model, FlowMeter)
            req.body._id =  mongoose.Types.ObjectId()
            req.body.device = device._id
			return new Measurement(req.body).save()
        }     
	})
}
*/


request = {
    status: 0, 
    params: {}, 
    body: {}, 
}

response = {
    data: {},
    status(code){
        this.status = code
        return this.json
    }, 
    json(data){
        this.data = data
        return data
    }
}

res = Object.create(response)
res.status(500).json({error: err})
console.log(res)