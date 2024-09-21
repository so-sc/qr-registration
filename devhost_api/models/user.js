const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    gID: { type: String, required: true, unique: true },
    username: { type: String, default: "John Doe" },
    syn_id:{type:String},
    usn:{type: String},
    college:{type: String},
    events:[String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;