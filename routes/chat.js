const {Router}      = require("express")
const chat          = require("../controllers/chat")
const router        = Router()

router.get("/chat", chat.chat)
router.get("/get_message", chat.getMessage)
router.post("/insert_message", chat.insertMessage)

module.exports = router