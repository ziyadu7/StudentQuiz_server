const express = require('express')
const studentController = require('../controllers/studentController')
const router = express.Router()
const auth = require('../middlewares/auth')

router.post('/register',studentController.Register)
router.post('/login',studentController.Login)
router.post('/submitQuiz',auth.verifyStudentToken,studentController.submitQuiz)
router.get('/getQuestions',auth.verifyStudentToken,studentController.getQuestions)

module.exports = router