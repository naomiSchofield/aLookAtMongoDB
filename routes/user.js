const {Router} = require('express')
const router = Router()

const userController = require ('../controllers/userController')

router.get('/', userController.getSignup)
  

router.post('/signup', userController.postSignup)


router.get('/signup', userController.getSignup)


router.get('/login', userController.getLogin)


router.post('/login', userController.getLogin)


router.get('/profile', userController.getProfile);



module.exports = router