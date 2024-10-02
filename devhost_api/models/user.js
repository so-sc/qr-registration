const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }
});
const eventSchema = new mongoose.Schema({
    event_id: { type: String, required: true },
    members: [memberSchema]
});
const userSchema = new mongoose.Schema({
    gID: { type: String, required: true, unique: true },
    username: { type: String, default: "John Doe" },
    syn_id:{type:String},
    email:{type:String},
    year:{type:String},
    branch:{type: String},
    phone:{type:String},
    usn:{type: String},
    git:{type: String},
    ldn:{type: String},
    portf:{type: String},
    insta:{type: String},
    college:{type: String},
    events:[String],
    interests:[String],
    eventDet:[eventSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;