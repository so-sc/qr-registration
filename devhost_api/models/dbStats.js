const mongoose = require('mongoose');

const dbstatsSchema = new mongoose.Schema({
    statID: {type:Number,unique:true, default: 117},
    syn_ct: { type: Number, default: 0},
    src_ct: { type: Number, default: 0}
    
});

const dbStats = mongoose.model('dbStats', dbstatsSchema);

module.exports = dbStats;