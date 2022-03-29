const {Router}      = require("express")
const axios         = require("axios")
const auth          = require("../controllers/auth")
const router        = Router()

router.get("/", function(req, res, next){
    res.redirect("/login")
})

router.get("/login", function(req, res, next){
    res.render('../views/auth/Login.html')
})
router.post("/login", auth.login)

router.get("/register", function(req, res, next){
    res.render('../views/auth/register.html')
})
router.post("/register", auth.register)

router.get("/forgot", function(req, res, next){
    res.render('../views/auth/forgot.html')
})
router.post("/forgot", function(req, res, next){
    res.send("Forgot Page")
})

router.get("/logout", auth.logout)


module.exports = router