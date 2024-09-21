const dbStats = require('./models/dbStats')
require('dotenv').config()

async function crStats(request, accessToken, refreshToken, profile, done) {
    try{
    let stats=await dbStats.findOne({statID: 117})
    if(stats) return;
    stats = new dbStats({
        statID: 117,
        syn_ct:0,
        src_ct:0
    });
    await stats.save();
    return;
}
catch(err){
    console.log(err);
}
  }
crStats();
