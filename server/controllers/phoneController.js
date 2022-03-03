const {PhoneModel} = require( './../models/phoneModel' );
const bcrypt = require( 'bcrypt' );
const {validationResult } = require('express-validator');


const PhoneController = {

    getAllNums: function(req,res){
        PhoneModel.findallPhones()
        .then(data=>{
            res.status(200).json(data)
        })
    },

    getUnusedNumber: async function(req,res){
        let numberinfo = await PhoneModel.findUnusedNumber()
        
        if(numberinfo == null){
            res.status(404).json({nonums: "No quedan números disponibles"})
        }
        else{
            //------------------------------
            let setOn = {calling : true}
            let setOff = {calling : false}
            //------------------------------
            await PhoneModel.updatePhone(numberinfo.id, setOn)

            setTimeout(async function(){
                await PhoneModel.updatePhone(numberinfo.id, setOff)
                console.log("Calling - off");
            }, (60000 * 20)) //todo------------------------------------------------------------Change Later-------------

            res.status(200).json(numberinfo)
        }
    },

    updateNumber: function(req, res){

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()});
        }
        else{

            _id = req.body._id

            updatedNum = {
                publisher : req.body.publisher,
                info: req.body.info,
                type: req.body.type || "N/A",
                notes: req.body.notes || "Sin Nota",
                user: req.body.user,
                called : true,
                updated_at: new Date()
            }

            PhoneModel.updatePhone(_id,updatedNum)
            .then(updatedData =>{
                res.status(200).json(updatedData)
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },

    requestResNumbers: function(req,res){

        let user = req.params.user

        PhoneModel.findmMyResevedNum(user)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            console.log(err);
        })
    },

    editCalledRegister: function(req,res){

        let infoReceived = req.body.info

        if(infoReceived === "all"){
            searchCondition = {}
        }
        else{
            searchCondition = {info: infoReceived}
        }
        
        phoneUpdated = {called: false}

        PhoneModel.updatePhones(searchCondition,phoneUpdated)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            console.log(err);
        })

    }




}

module.exports = { PhoneController };