const express = require('express')
const router = express.Router()

const {
     login,
     register,
     checkEmail,
     verifyEmail
} = require('../controllers/auth')

router.post('/',register)
router.post('/check-email', checkEmail)
router.post('/verify-email', verifyEmail)
router.post('/login', login)

module.exports = router