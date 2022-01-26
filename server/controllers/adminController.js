const {AdminModel} = require( './../models/adminModel' );
const {CodeModel} = require( './../models/codeModel' );
const bcrypt = require( 'bcrypt' );

const {transporter} = require('../config/mailer');


const AdminsController = {


createNewAdmin : function (req,res) {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let confpassword = req.body.confpass;
    let admincode = req.body.admincode;
    let admintype;
//* Validations-------------------------------------------------------------------------------
    let errormsj = {};
    let isValid = true;

//?--------------------------------------------------

if(firstname && lastname && username && email && password && admincode){

if(firstname.length < 3){
    errormsj.firstnamelen = "🔏 El nombre debe ser de al menos 3 caracteres"
    isValid = false;
}
if(lastname.length < 3){
    errormsj.lastnamelen = "🔏 El apellido debe ser de al menos 3 caracteres"
    isValid = false;
}
if(username.length < 5){
    errormsj.usernamelen = "🔏 El nombre de usuario debe ser de al menos 5 caracteres"
    isValid = false;
}
if(password.length < 8){
    errormsj.passlen = "🔏 La contraseña debe ser de al menos 8 caracteres"
    isValid = false;
}
if(password !== confpassword){
    errormsj.passnotmatch = "🔏 Las contraseñas no coinciden"
    isValid = false;
}

CodeModel.findMatch(admincode)
.then(result=>{
    
    console.log(result.identifier);

    if(result !== null && result.identifier === "Total" || result.identifier === "Normal"){
        if(result.identifier === "Total"){
            admintype = "Total"
        }
        if(result.identifier === "Normal"){
            admintype = "Normal"
        }
    }
    else{
        if(result === null || result.identifier !== "Total" || result.identifier !== "Normal"){
            errormsj.coderror = "📮 El codigo de administrador no es correcto"
            isValid = false
        }
        
    }

//* Validations-------------------------------------------------------------------------------

    if(isValid){
        bcrypt.hash(password,10)
        .then(encryptedpass=>{
            newAdmin = {
                firstname, lastname, email, username, password : encryptedpass, admintype
            }
            AdminModel.createAdmin(newAdmin)
            .then(created =>{
                createdAdmin = {
                    _id: created._id,
                    firstname : created.firstname,
                    lastname : created.lastname,
                    username : created.username,
                    email: created.email,
                    admintype : created.admintype
                }
                res.status(200).json(createdAdmin)
            })
            .catch(error =>{

                errormsj = {};

                console.log(error);

                console.log(error.keyValue);

                if(error.keyPattern.email){
                    errormsj.emailUsed = "🎈 Alguien mas ya tiene este email"
                }
                if(error.keyPattern.username){
                    errormsj.usernameUsed = "🎈 Alguien mas ya tiene este usuario"
                }
                
                res.status(400).json(errormsj)
                // console.log("This is the problem: ", error);
            })
        })
        
    }
    else{
        res.status(400).json(errormsj)
    }
})
.catch(err=>{
    console.log(err);
})
}
else{
    let errormsj = {
        emptyerror: "📄 Parece que dejaste un espacio en blanco"
    }
    res.status(400).json(errormsj)
}
}, //? createNewAdmin END


login:function (req,res) {

    let username = req.body.username;
    let password = req.body.password;

    if(username && password){
        AdminModel.getAdminByUsername(username)
        .then(data=>{

            if(!data){
                let errormsj = {
                    adminerror: "⚠️ Este usuario que ingresaste no existe"
                }
                res.status(400).json(errormsj)
            }
            bcrypt.compare( password, data.password )
            .then(flag =>{
                if( !flag ){
                    let errormsj = {
                        passworderror: "🔐 La contraseña que ingresaste es incorrecta"
                    }
                    res.status(400).json(errormsj)
                }
            
            userInfo = {
                _id: data._id,
                firstname : data.firstname,
                lastname : data.lastname,
                username : data.username,
                email: data.email,
                admintype : data.admintype
            }
            res.status(200).json(userInfo);
            })
            .catch( error => {
                res.statusMessage = error.message;
                res.status(406).end()
            }); 
        })
        .catch( error => {
            res.statusMessage = error.message;
            res.status(406).end()
        });
    }
    else{
        let errormsj = {
            emptyerror: "📄 Parece que dejaste un espacio en blanco"
        }
        res.status(400).json(errormsj)
    }

},//? login END



sendEmail_forgotpass:function (req,res) {

    let emailToRecover = req.body.email;
    const recoverToken = "pass" + Date.now() + Math.round(Math.random() * 1E9);
    // console.log(recoverToken);

    AdminModel.getAdminByEmail(emailToRecover)
    .then(data=>{
        if(data !== null){
            tokensetter = {
                recoverToken
            }
            AdminModel.updateadmin(data._id,tokensetter)
            .then(data=>{
                transporter.sendMail({
                    from: '"Recuperacion de contraseña 📮" <elestadiocn.notific@gmail.com>', // sender address
                    to: emailToRecover, // list of receivers
                    subject: "Programa de Recuperacion de contraseña", // Subject line
                //!EMAIL------------------------------------------------------
                //Todo: Ver si siempre vamos a usar ese recovery token
                //Todo: Terminar de ajustar el enlace que envia el correo (Para el deployment)
                    html: `<!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Recuperacion</title>
                        <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
                    </head>
                    <body style="font-family: 'Roboto', sans-serif;width: 500px;">
                        <h1>Has solicitado un cambio de contraseña 🔐</h1>
                        <p style="margin: 5px 0px;"> Hola ${data.firstname}:</p>
                        <p style="margin: 5px 0px;">Recibimos una solicitud para restablecer tu contraseña.</p>
                        <p style="margin: 5px 0px;">Ingresa el siguiente codigo
                        <a href="http://localhost:4200/restablecer/contra/${data._id}">aquí</a> para restablecer tu contraseña:</p>
                        
                        <h2 style="background-color: rgb(171, 212, 231);
                        width: auto;
                        padding: 10px;
                        border-radius: 10px;
                        color: rgb(0, 0, 0);
                        text-align: center;">${data.recoverToken}</h2> 
                    
                        <p style="margin: 5px 0px;margin-bottom: 10px; font-weight: 600;">También puedes usar el codigo aqui directamente.</p>
                        
                        <div style="display: flex; justify-content: center; margin: 0;">
                            <a href="http://localhost:8080/restablecer/contra/${data._id}" style="padding: 7px 150px;
                            background-color: rgb(11, 11, 99);
                            color: white;
                            text-decoration: none;
                            border-radius: 10px;
                            font-size: 16px;
                            margin-bottom: 20px;">Cambiar Contraseña</a>
                        </div>
                    </body>
                    </html>`
            //!EMAIL------------------------------------------------------

                }).then(data=>{
                    msj = {
                        emailsend : "✅✉️ Se ha enviado a tu correo un email con una nueva contraseña",
                        emailstat : data
                    }
                    res.status(200).json(msj)
                })
                .catch(err=>{
                    console.log(err);
                    res.status(400).end()
                })
            })
            .catch(err=>{
                console.log(err);
            })
        }
        else{
            msj = {
                usernoexits : "📍 La cuenta que intentas recuperar no existe"
            }
            res.status(400).json(msj);
        }
    })
    .catch(error=>{
        res.status(400).end()
    })


},//? sendEmail_forgotpass END

changepassword:function (req,res) {
    let IDToRecover = req.body._id;
    let recoverToken = req.body.token;
    let newpassword = req.body.password;
    let newpasswordconf = req.body.passwordconf;
    let isValid = true;
    let errormsj = {};
//!Validations------------------------------------------------------------------------------------

if(!IDToRecover || !recoverToken || !newpassword || !newpasswordconf){
    errormsj.empty = "📄 Parece que dejaste uno de los espacios en blanco"
    isValid = false
}
if(newpassword !== newpasswordconf && isValid){
    errormsj.passnotmatch = "⚠️ Las contraseñas no coinciden"
    isValid = false
}


//!Validations------------------------------------------------------------------------------------
if(isValid){
    AdminModel.getAdminByID(IDToRecover)
    .then(result=>{
        if(result !== null){
            if(result.recoverToken === recoverToken){
            bcrypt.hash(newpassword,10)
            .then(encryptedpass=>{
                passwordchanger = {
                password : encryptedpass
                }
                AdminModel.updateadmin(result._id,passwordchanger)
                .then(data=>{
                    res.status(200).json({success: "✅ La contraseña ha sido cambiada con exito"})
                })
                .catch(err=>{
                    console.log(err);
                    res.status(400).end()
                })
            })
            }
            else{
                res.status(200).json({wrongtoken: "🚨 El codigo es incorrecto"})
            }
        }
        else{
            res.status(400).json({msjerror:"No se puede cambiar la contraseña a este usuario"})
        }
        
    })  
    .catch(err=>{
        console.log(err);
        res.status(400).end()
    })
}
else{
    res.status(400).json(errormsj)
}
} //? changepassword END




}//*Controller END

module.exports = { AdminsController };