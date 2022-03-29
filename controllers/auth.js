const axios     = require("axios")
const session   = require("express-session");

module.exports.login = async (req, res) => {
    
    await axios.post("http://localhost:11223/api/v1/auth/login", 
    {
        email:req.body.email,
        password:req.body.password
    }).then(resp=>{
        if(resp.data.data.isLogin=="Success"){
            sess         = req.session
            sess.idUser  = resp.data.data.idUser
            sess.email   = req.body.email
            res.redirect("/chat")
        }else{
            req.flash("success", resp.data.data.message)
            res.redirect("/login")
        }
    }).catch(err=>{
        //console.log(err)
    })
}

module.exports.register = async (req, res) => {
    const email             = req.body.email
    const password          = req.body.password
    const password_confirm  = req.body.password_confirm
    
    if(req.body.password!==req.body.password_confirm){
        req.flash("failed", "Password Not Identical!")
        res.redirect("/register")
    }else{
        await axios.post("http://localhost:11223/api/v1/auth/register", 
        {
            email:email,
            password:password,
            password_confirm:password_confirm
        }).then(resp=>{
            if(resp.data.data.isRegistered=="Success"){
                req.flash("success", resp.data.data.message)
            }else{
                req.flash("failed", resp.data.data.message)
            }
            res.redirect("/register")
        }).catch(err=>{
            //console.log(err)
        })
    }
}

module.exports.logout = (req, res) => {
    res.redirect("/login")
}

module.exports.forgot = (req, res) => {
    res.send("Login Page")
}

