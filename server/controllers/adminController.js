const {AdminModel} = require( './../models/adminModel' );
const {CodeModel} = require( './../models/codeModel' );
const bcrypt = require( 'bcrypt' );

const {transporter} = require('../config/mailer');


const AdminsController = {


createNewAdmin : function (req,res) {
    let firstname = req.body.firstname.trim();
    let lastname = req.body.lastname.trim();
    let email = req.body.email.trim();
    let username = req.body.username.trim();
    let password = req.body.password.trim();
    let confpassword = req.body.confpass.trim();
    let admincode = req.body.admincode.trim();
    let admintype;
//* Validations-------------------------------------------------------------------------------
    let errormsj = {};
    let isValid = true;

//?--------------------------------------------------
console.log(firstname,lastname,email,username,password,confpassword,admincode);
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
    
    console.log(result)

    if(result !== null){
        if(result.identifier === "Total"){
            admintype = "Total"
        }
        if(result.identifier  === "Normal"){
            admintype = "Normal"
        }
        if(result.identifier  === "Register"){
            admintype = "Register"
        }
    }
    else{
        if(result === null){
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

                console.log(error);
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

    let email = req.body.email.trim();
    let password = req.body.password.trim();

    if(email && password){
        AdminModel.getAdminByEmail(email)
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

    let emailToRecover = req.body.email.trim();
    const recoverToken = "RT" + Date.now() + Math.round(Math.random() * 1E9);
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
                    from: '"Recuperacion de contraseña" <elestadiocn.notific@gmail.com>', // sender address
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
                            <body style="font-family: 'Roboto', sans-serif;width: auto; text-align: center; border: 2px solid black; border-radius: 10px; padding: 20px;">
                                <h1 style="text-align: center;">Solicitud de cambio de contraseña 🔐</h1>
                                <p style="margin: 5px 0px;"> Hola ${data.firstname}</p>
                                <p style="margin: 5px 0px;">Recibimos una solicitud para restablecer tu contraseña.</p>
                                <p style="margin: 5px 0px; font-weight: 500; margin-top: 20px;">Ingresa el siguiente codigo 
                                    <a href="https://johandrog.github.io/Tablero-de-Anuncios/restablecer/contra/${data._id}" style="text-decoration: none; color: rgb(51, 51, 245);">aquí</a>
                                    para restablecer tu contraseña:</p>
                                
                                <div style="display: flex; justify-content: center;">
                                    <h2 style="background-color: rgb(124, 187, 250);
                                    width: 35vw;
                                    padding: 10px;
                                    border-radius: 10px;
                                    color: rgb(0, 0, 0);
                                    text-align: center;">${data.recoverToken}</h2>
                                </div>
                                
                                
                                    <a href="https://johandrog.github.io/Tablero-de-Anuncios/restablecer/contra/${data._id}" style=" width: 22vw;
                                    padding: 10px;
                                    text-align: center;
                                    background-color: rgb(0,51,103);
                                    color: white;
                                    text-decoration: none;
                                    border-radius: 10px;
                                    font-size: 16px;
                                    margin-bottom: 20px;">Toca para cambiar la Contraseña</a>
                                

                                <p><strong>Nota:</strong> Si tu no solicitaste este cambio de contraseña puedes ignorar este correo...</p>
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
    let IDToRecover = req.body._id.trim();
    let recoverToken = req.body.token.trim();
    let newpassword = req.body.password.trim();
    let newpasswordconf = req.body.passwordconf.trim();
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