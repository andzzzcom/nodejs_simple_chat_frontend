const express       = require("express")
const bodyParser    = require("body-parser")
const cookieParser  = require("cookie-parser")
const session       = require("express-session")
const env           = require("dotenv")
        env.config()
const nunjucks      = require("nunjucks")
const multer        = require("multer")
const flash         = require("connect-flash")
const path          = require("path")
const routes        = require("./routes/routes.js")
const app           = express()

app.use(express.static(path.join(__dirname, '/public')))
app.use(session({
    secret:"secretkey",
    saveUninitialized:true,
    cookie:{maxAge:240000},
    resave:false
}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(flash())

app.use(function(req, res, next){
    res.locals.message = req.flash();
    next();
});

nunjucks.configure("views", {
    autoescape:true,
    express:app
})

app.use(routes)

var server          = app.listen(process.env.PORT, function(){
    console.log("Server Started at Port:"+process.env.PORT)
})

/*
var io = require('socket.io').listen(server);
io.on('connect', function(socket) {
	console.log("connected !!");
	
    socket.on("pong", function(data){
        console.log("Oke!")
    })
});
*/