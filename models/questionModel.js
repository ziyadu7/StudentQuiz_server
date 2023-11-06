const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    question :{
        type:String
    },
    answer:{
        type:String
    },
    option1:{
        type:String
    },
    option2:{
        type:String
    },
    option3:{
        type:String
    }
})

module.exports = mongoose.model('Questions',questionSchema)