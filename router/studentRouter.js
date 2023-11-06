const express = require('express')
const studentController = require('../controllers/studentController')
const router = express.Router()

router.post('/register',studentController.Register)
router.post('/login',studentController.Login)
router.post('/submitQuiz',studentController.submitQuiz)
router.get('/getQuestions',studentController.getQuestions)

module.exports = router