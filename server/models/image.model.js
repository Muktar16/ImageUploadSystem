const mongoose = require('mongoose');

const schema = mongoose.Schema({
    fname:{type:String,required:true},
    phone:{type: String,required: true},
    storyUUID:{type: String,required: true},
    time:{type: Date,default: Date.now,required: true}
});

module.exports = mongoose.model('Image',schema); 