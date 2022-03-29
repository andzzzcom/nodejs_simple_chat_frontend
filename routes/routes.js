const {Router}      = require("express")
const auth          = require("./auth")
const profile       = require("./profile")
const chat          = require("./chat")
const router        = Router()

router.use(auth)
router.use(profile)
router.use(chat)

module.exports = router