const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    question :{
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
    },
    option4:{
        type:String
    },
    answerNo:{
        type:Number
    }
})

module.exports = mongoose.model('Questions',questionSchema)