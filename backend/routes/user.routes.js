const router = require('express').Router()
const {postRegister,postLogin} = require('../controllers/user.controller')
const {checkUserToken} = require('../controllers/user.auth')

router.post('/login',postLogin)

router.post('/register',postRegister)

router.post('/check/user/token',checkUserToken)

module.exports = router