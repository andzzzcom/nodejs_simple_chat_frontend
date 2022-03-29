const axios     = require("axios")
const session   = require("express-session");

module.exports.chat = async (req, res) =>{
    if(req.session.email==undefined){
        return res.redirect("/login")
    }
     
    await axios.get("http://localhost:11223/api/v1/chat/chat")
    .then(resp=>{
        const email = req.session.email
        const result = resp.data.data
        res.render('../views/chat.html', {chats:result, email:email})
    }).catch(err=>{
        //console.log(err)

    })
}

module.exports.getMessage = async (req, res) =>{
    if(req.session.email==undefined){
        return res.redirect("/login")
    }

    await updateUser(req.session.idUser);
    let online_users = await getOnlineUser()
    
    let messages     = await getMessage()
    res.send({data:messages, onlineUser:online_users})
}

module.exports.insertMessage = async (req, res) =>{

    await axios.post("http://localhost:11223/api/v1/chat/insert_message", 
    {
        idUser:req.session.idUser,
        message:req.body.message
    }).then(resp=>{
        console.log(resp.data)
        /*
        if(resp.data.data.isLogin=="Success"){
            sess         = req.session
            sess.email   = req.body.email
            res.redirect("/chat")
        }else{
            req.flash("success", resp.data.data.message)
            res.redirect("/login")
        }
        */

    }).catch(err=>{
        //console.log(err)
    })
    res.send({data:5})
}

function getMessage(){
    return new Promise((resolve, reject)=>{
        axios.get("http://localhost:11223/api/v1/chat/chat")
        .then(resp=>{
            resolve(resp.data.data)
        }).catch(err=>{
            reject(err)
        })
    })
}

function updateUser(idUser){
    return new Promise((resolve, reject)=>{
        axios.put("http://localhost:11223/api/v1/chat/update_user", 
        {
            idUser:idUser,
            description:Math.random()
        }).then(resp=>{
            console.log(resp.data)
            resolve(resp)
        }).catch(err=>{
            reject(err)
        })
    })
}

function getOnlineUser(){
    return new Promise((resolve, reject)=>{
        axios.get("http://localhost:11223/api/v1/chat/get_online_user")
        .then(resp=>{
            resolve(resp.data.data)
        }).catch(err=>{
            reject(err)
        })
    })
}