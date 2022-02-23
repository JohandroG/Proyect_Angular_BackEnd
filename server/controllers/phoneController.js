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
            res.status(200),json({nomorenums: "Ya se utilzaron todos los numeros pronto habilitaremos de nuevo mas"})
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
            }, (60000 * 20))

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
                type: req.body.type,
                notes: req.body.notes,
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




}

module.exports = { PhoneController };