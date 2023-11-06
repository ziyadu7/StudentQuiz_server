const adminModel = require('../models/adminModel');
const questionModel = require('../models/questionModel');
const studentModel = require('../models/studentModel')
const {generateToken} = require('../middlewares/auth')

const login = async (req,res)=>{
    try {
        const {name,password} = req.body
        const admin = await adminModel.findOne({$and:[name,password]})

        if(admin){
            const token = generateToken(admin._id,'admin')
            res.status(200).json({message:'Login successfull',admin,token})
        }else{
            res.status(409).json({errMsg:"You are not an admin"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({errMsg:'Server Error'})
    }
}

const getData = async (req,res)=>{
    try {
        const userData = await studentModel.find()
        res.status(200).json({userData})
    } catch (error) {
        console.log(error);
        res.status(500).json({errMsg:'Server Error'})
    }
}

const acceptUser = async (req,res)=>{
    try {
        const {studentId} = req.body

        await studentModel.updateOne({_id:studentId},{$set:{isAccepted:true}}) 
        res.status(200).json({message:"Accepted Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({errMsg:'Server Error'})
    }
}

const addQuestion = async (req,res)=>{
    try {
        const {question,answer,option1,option2,option3} = req.body

        await questionModel.create({question,answer,option1,option2,option3})
        res.status(200).json({message:"Question added successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({errMsg:'Server Error'})
    }
}

module.exports = {
    getData,
    acceptUser,
    addQuestion,
    login
}