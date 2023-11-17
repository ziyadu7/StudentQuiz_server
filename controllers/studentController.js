const studentModel = require('../models/studentModel')
const sha256 = require('js-sha256')
const { generateToken } = require('../middlewares/auth')
const questionModel = require('../models/questionModel')

const Register = async (req, res) => {
    try {
        const { userName, password } = req.body

        const student = await studentModel.findOne({ userName })
        if (student) {
            res.status(409).json({ errMsg: "There is already a user with the username" })
        } else {
            await studentModel.create({ userName, password: sha256(password + 'sha123') })
            res.status(200).json({ message: 'Registered Successfully' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ errMsg: "Server Error" })
    }
}

const Login = async (req, res) => {
    try {
        const { userName, password } = req.body

        const student = await studentModel.findOne({ userName, password: sha256(password + 'sha123') })

        if (student) {
            if (student.isAccepted) {
                const token = generateToken(student._id, 'student')
                res.status(200).json({ message: "Login Success", token, student, role: 'student' })
            } else {
                res.status(403).json({ errMsg: 'Blocked by admin' })
            }
        } else {
            res.status(400).json({ errMsg: 'User Not Found' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ errMsg: "Server Error" })
    }
}

const getQuestions = async (req, res) => {
    try {
        const questions = await questionModel.find()
        res.status(200).json({ questions })
    } catch (error) {
        console.log(error);
        res.status(500).json({ errMsg: "Server Error" })
    }
}

const submitQuiz = async (req, res) => {
    try {
        const { mark, studentId } = req.body
        await studentModel.updateOne({ _id: studentId }, { $set: { mark, isAttend: true }, $inc: { noOfTry: 1 } })
        res.status(200).json({ message: "Successfully submited" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ errMsg: "Server Error" })
    }
}


const tryAgain = async (req, res) => {
    try {
        const { id } = req.payload
        await studentModel.updateOne({ _id: id }, { $set: { isAttend: true, mark: 0 } })

        res.status(200).json({ message: "All the best" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ errMsg: "Server Error" })
    }
}


module.exports = {
    Register,
    Login,
    getQuestions,
    submitQuiz,
    tryAgain
}