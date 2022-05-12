const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        require:true
    },
    message:{
        type:String,
        required:false
    }
    
})
module.exports = mongoose.model('message', articleSchema);