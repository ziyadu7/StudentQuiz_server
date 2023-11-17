const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    userName :{
        type:String
    },
    password:{
        type:String
    },
    mark:{
        type:Number,
        default:0
    },
    isAccepted:{
        type:Boolean,
        default:false
    },
    isAttend:{
        type:Boolean,
        default:false
    },
    noOfTry:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('Student',studentSchema)