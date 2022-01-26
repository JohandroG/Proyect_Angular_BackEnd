const {NoticeModel} = require( './../models/noticeModel' );
const fs = require('fs');
const multer  = require('multer');


//*------------MULTER IMAGE UPLOAD---------------------------------------------------------------------------
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname );
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
    } else {
    cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
    fileSize: 1024 * 1024 * 10 //*Limite 10 Megas
    },
    fileFilter: fileFilter
});
//*------------MULTER IMAGE UPLOAD---------------------------------------------------------------------------



const NoticesController = {

createNotice : [
    upload.single( 'noticeImage' ),

    function (req,res) {

        
        let title = req.body.title;
        let description = req.body.description;
        if(req.file){
            var picture = req.file.path;
        }
        let link = req.body.link;
        let importance = req.body.importance;
        let creator = req.body.creator;
        let created_at = new Date();
        let updated_at = new Date();
//!--Validations--------------------------------------------------------------------------------------------
if (title && description && creator){

let isValid = true;
let errormsj = {};

if(title.length < 5 ){
    errormsj.titlelen = "🔏 El titulo debe ser de al menos 5 caracteres"
    isValid = false;
}
if(description.length < 8 ){
    errormsj.desclen = "🔏 La descripcion debe ser de al menos 8 caracteres"
    isValid = false;
}
//!--Validations--------------------------------------------------------------------------------------------


    if(isValid){
        
            newNotice = {
                title,
                description,
                link,
                picture,
                importance,
                creator,
                created_at,
                updated_at
            }
        NoticeModel.createNotice(newNotice)
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })

    }
    else{
        res.status(400).json(errormsj)
    }
}
else{
    let errormsj = {
        emptyerror: "📄 Parece que dejaste un espacio en blanco"
    }
    res.status(400).json(errormsj)
}

    }
],


deletenotice: function (req,res) {

    id = req.params.id

    NoticeModel.findNoticeByID(id)
    .then(info =>{
        if(info.picture){
            let filename = info.picture.substring(8);
            try{
                fs.unlinkSync('./uploads/' + filename)
            }
            catch(err){
                console.log(err);
            }
            finally{
                console.log("File deleted");
            }
        }
        NoticeModel.deleteNoticeByID(id)
        .then(data=>{
            res.status(204).end()
        })
        .catch(err=>{
            errormsj = {
                msj: "There was a problem deleting this"
            }
            res.json(errormsj)
            // console.log(err);
        })
    })
    .catch(err=>{
        // console.log(err);
        errormsj = {
            msj: "You can not delete a notice that doesn't exits"
        }
        res.json(errormsj)
    })
},

updatenotice: [
    upload.single( 'noticeImage' ),
        function (req,res) {

        id = req.params.id
        let errormsj = {};

        let title = req.body.title;
        let description = req.body.description;
        //*----------------------
        if(req.file){
            var picture = req.file.path;
        }
        //*----------------------
        let link = req.body.link;
        let importance = req.body.importance;
        let updated_at = new Date();

        NoticeModel.findNoticeByID(id)
        .then(info =>{

            noticeupdated = {}

            isValid = true;

            if(title){
                if(title.length < 5 ){
                    errormsj.titlelen = "🔏 El titulo debe ser de al menos 5 caracteres"
                    isValid = false;
                }
                noticeupdated.title = title;
            }
            if(description){
                if(description.length < 8 ){
                    errormsj.desclen = "🔏 La descripcion debe ser de al menos 8 caracteres"
                    isValid = false;
                }
                noticeupdated.description = description;
            }
            if(picture){
                if(info.picture !== null){
                    let filename = info.picture.substring(8);
                    try{
                        fs.unlinkSync('./uploads/' + filename)
                    }
                    catch(err){
                        console.log(err);
                    }
                    finally{
                        console.log("File deleted");
                    }
                }
                
                noticeupdated.picture = picture;
            }
            
            if(link){
                noticeupdated.link = link;
            }
            if(importance){
                noticeupdated.importance = importance;
            }
            noticeupdated.updated_at = updated_at;
            
            if(isValid){
                NoticeModel.updatenotice(id,noticeupdated)
                .then(updatedinfo=>{
                    res.status(200).json(updatedinfo)
                })
                .catch(err=>{
                    console.log(err);
                    res.status(404).end();
                })
            }
            else{
                res.status(400).json(errormsj)
            }
            
        })
        .catch(err=>{
            errormsj = {
                msj: "You can not update a notice that doesn't exits"
            }
            console.log(err);
            res.json(errormsj)
        })
        
    }
],

deleteIMG : function (req,res) {
    id = req.params.id

    NoticeModel.findNoticeByID(id)
    .then(info =>{
        if(info.picture){

            console.log(info);

            let filename = info.picture.substring(8);
            try{
                fs.unlinkSync('./uploads/' + filename)
            }
            catch(err){
                console.log(err);
            }

            updatedNotice = {
                picture : null,
            }
            NoticeModel.updatenotice(info._id,updatedNotice)
            .then(result=>{
                console.log("Reference deleted");
                res.status(200).json({success:"✅ Imagen eliminada con exito"})
            })
        }
        else{
            errormsj = {
                noremove: "❌ Esta publicacion no tiene una imagen que podamos remover"
            }
            res.status(400).json(errormsj)
        }
    })
    .catch(err=>{
        errormsj = {
            msj: "❌ Esta publicacion no tiene una imagen que podamos remover"
        }
        res.json(errormsj)
    })
},

requestallNotices: function (req,res) {
    NoticeModel.findallNotices()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(error=>{
        console.log(error);
    })
},

findNotice: function (req,res) {
    
    let _id = req.params._id

    NoticeModel.findNoticeByID(_id)
    .then(data=>{
        if(data !== null){
            res.status(200).json(data)
        }
        else{
            res.status(400).json({err: "No se encontro ninguna coincidencia"})
        }
    })
    .catch(err=>{
        res.status(400).end()
    })
}


}


module.exports = { NoticesController };