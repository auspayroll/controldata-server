const mongoose = require('mongoose');

const DeviceModelSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    schemaName: { type: String, required: true},
    manufacturer: { type: String, required: true },
    description: String
})

const DeviceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serial: { type: String, required: true },
    model: { type: mongoose.Schema.Types.ObjectId, ref: 'DeviceModel', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
    description: String
})

const FlowMeterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
    ts: { type: Number, required: true }, 
    flow: Number,
    flow_u: String, 
    vel: Number,
    vel_u: String
})

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    username: { type: String, unique: true , required: true },
    //email: { type: String, unique: true , required: true , match: some_regex },
    password: { type: String, required: true },
    key: { type: String, required: true }
})

module.exports.Device = mongoose.model('Device', DeviceSchema)

module.exports.DeviceModel = mongoose.model('DeviceModel', DeviceModelSchema)

module.exports.FlowMeterSchema = FlowMeterSchema

module.exports.User = mongoose.model('User', UserSchema)
