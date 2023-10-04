const router = require("express").Router()
const controller = require("../controllers/authController")


// register router
router.post('/register', controller.register)
// login router
router.post('/login', controller.login)

module.exports = router;