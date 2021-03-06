//*REQUIRES------------------------------------------------------------------------------------------
const express = require('express');
const {AdminRouter} = require('./server/routes/adminRouter');
const {CodeRouter} = require('./server/routes/codeRouter');
const {NoticeRouter} = require('./server/routes/noticeRouter');
const {PhoneRouter} = require('./server/routes/phoneRouter');
const {PushTokenRouter} = require('./server/routes/pushtokenRouter');
const path = require('path');
var cors = require('cors');

//*APP------------------------------------------------------------------------------------------
const app = express();
app.use(cors())
app.use( express.urlencoded({extended:true}) );
app.use( express.json() );
app.use(express.static(path.join(__dirname, "/public/dist/public")))
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
app.use("/resources", express.static(path.join(__dirname + "/resources")));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTION");
    next();
});


//*DATABASE------------------------------------------------------------------------------------------
require("./server/config/database.js");

//*ROUTES------------------------------------------------------------------------------------------
app.use( '/admins', AdminRouter );
app.use( '/codes', CodeRouter );
app.use( '/notices', NoticeRouter );
app.use( '/phones', PhoneRouter );
app.use( '/push-tokens', PushTokenRouter );


// app.all('*', function (req,res) {
//     res.sendFile(path.resolve(".././public/dist/public/index.html"))
// })

//*ANGULAR------------------------------------------------------------------------------------------


//todo app.all('*', function (req,res) {
//     res.sendFile(path.resolve("./public/dist/public/index.html"))
// })

//*PORTS----------------------------------------------------------------------------------------

//! let port = 8080
const port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log("This server is working on port: 8080");
})


