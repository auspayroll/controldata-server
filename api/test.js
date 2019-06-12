const mongoose = require('mongoose')
const Devices = require('./models/devices')
const Measurement = require('./models/measurements')
const DeviceModels = require('./models/deviceModels')
const Users = require('./models/users')

function Request(init){
    this.params = this.body = {}
    if(typeof(init) == 'object'){
        Object.keys(init).forEach(key => {
            this.params[key] = init[key]
        })
    }
    console.log('new request')
    console.log(init)
}

function Response(){
    this.status = function(code){
        this.code = code
        return this
    }, 
    this.json = function(data){
        this.data = data
        return this
    }
}

mongoose.connect(
	"mongodb://localhost:27017/test", { useNewUrlParser: true }
)


var errors = []

var deviceId

var newModel = new Request({ name: "RS232", description: "xxx", manufacturer: "Sony", schemaName: "FlowMeterSchema"})

var newUser = new Request({name: "Simon", username: "sgranjt89883fjhf", password: "password"})

var token

var test = Users.create(newUser, new Response())
    .then(response => { //create a user
        console.log(response)
        if(response.code == 201){
            console.log('User created ok')
            return response
            
        } else {
            errors.push(response)
            throw 'failed to create User'
        }
    })
    .then(response => { //get user
        getUserReq = new Request({ username: newUser.body.username })
        return Users.get(getUserReq, new Response())
    })
    .then(response => {
        if(response.data.username != newUser.body.username){
            throw 404
        } else {
            return response.data
        }
    })
    .then(user => {
        return Users.login(newUser, new Response())
    })
    .then(response => { 
        if(response.code == 200){
            token = response.data.token 
            return response
        } else {
            throw response.code
        }
    })
    .then(response => { //delete user
        return Users.delete(newUser, new Response())
    })
    .then(response => {
        if(response.code == 200){
            return response
        } else{
            throw response.code
        }
    }) 
    .then(response => {
            return DeviceModels.create(newModel, new Response())
        }
    )
    .then(response => { //create a model
        console.log(response)
        if([201, 409].includes(response.code)){
            console.log('Model created ok')
            return response
            
        } else {
            errors.push(response)
            throw 'failed to create model'
        }
    })
    .then(response => { //get a model
        console.log(response)
        return DeviceModels.get(new Request({id: response.data._id}), new Response())
    })
    .then(response => {
        if(response.code == 200){
            console.log('Model fetched ok')
            return response
        } else {
            errors.push(response)
            throw 'failed to fetch Model'
        }
    })
    .then(response => { //update a model
        console.log(response)
        req = new Request({ id:response.data._id, description: "updated description" })
        return DeviceModels.update(req, new Response())
    })
    .then(response => {
        console.log(response)
        if(response.code == 200){
            console.log("model updated")
            return response
        } else {
            errors.push(response)
            throw 'model not updated'
        }
    })
    .then(response => { //create device
        console.log('creating a device..')
        var newDeviceRequest = new Request({ serial: 'serial_no', model: response.data._id,
            description: "A test device" })
        return Devices.create(newDeviceRequest, new Response())
    })
    .then(response => {
        if(response.code == 201){
            console.log('..ok')
            return response          
        } else {
            errors.push(response)
            throw '---> FAILED to create device'
        }
    })
    .then(response => { //get a device
        console.log(response)
        console.log('fetching device..')
        return Devices.get(new Request({id: response.data._id}), new Response())
    })
    .then(response => {
        if(response.code == 200){
            console.log('...ok')
            return response
        } else {
            errors.push(response)
            throw '---> FAILED to fetch Device'
        }
    })
    .then(response => { //update a device
        console.log(response)
        console.log('updating a device')
        deviceId = response.data._id
        req = new Request({ id:response.data._id, description: "updated description" })
        return Devices.update(req, new Response())
    })
    .then(response => {
        console.log(response)
        if(response.code == 200){
            console.log("..ok")
            return response
        } else {
            errors.push(response)
            throw '---> FAILED device not updated'
        }
    }) 
    .then(response => { //create a measurement
        newMeasurementReq = new Request({ device_id: response.data._id, 
            ts: 42342343, flow:54.4, flow_u: 'flow_u', vel: 275, vel_u: 'vel_u'})
        Measurement.create(newMeasurementReq, new Response()) 
        newMeasurementReq = new Request({ device_id: response.data._id, 
                ts: 42342344, flow:54.4, flow_u: 'flow_u', vel: 275, vel_u: 'vel_u'})
        Measurement.create(newMeasurementReq, new Response()) 
        newMeasurementReq = new Request({ device_id: response.data._id, 
                ts: 42342345, flow:54.4, flow_u: 'flow_u', vel: 275, vel_u: 'vel_u'})
        return Measurement.create(newMeasurementReq, new Response())         
    })
    .then(response => {
        if(response.code == 201){
            console.log("..ok")
            return response
        } else {
            errors.push(response)
            throw '---> FAILED measurement not created'
        }
    })
    .then(response => { //get a measurement
        newMeasurmentReq = new Request({ device_id: deviceId })
        return Measurement.all(newMeasurementReq, new Response())
    }) 
    .then(response => {
        console.log('+++++++++++++++++++++++++++')
        console.log(response)
        return response
    })
    .then(response => { //delete device
        deleteRequest = new Request({ id: deviceId })
        return Devices.delete(deleteRequest, new Response())
    })
    .then(response => { //delete the model
        console.log('deleting model')
        deleteRequest = new Request({ id: response.data.model })
        return DeviceModels.delete(deleteRequest, new Response())
    })
    .then(response => {
        if(response.code == 200){
            console.log("..ok")
            return response
        } else {
            errors.push(response)
            throw '---> FAILED model not deleted'
        }
    })
    .catch(err => {
        console.log(err)
        console.log(errors)
        console.log('FAILED')
    })



Promise.resolve(test).then( _ => {
    mongoose.connection.close()
    console.log(errors.length + ' errors')
});


