const {Router}      = require("express")
const profile       = require("../controllers/profile")
const router        = Router()

router.get("/profile", function(req, res, next){
    res.send("Profile Page")
})

module.exports = router