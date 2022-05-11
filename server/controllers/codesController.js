const {AdminModel} = require( './../models/adminModel' );
const {CodeModel} = require( './../models/codeModel' );
const bcrypt = require( 'bcrypt' );


const CodesController = {

    updateTCode: function (req,res) {
        oldcode = req.body.oldcode;
        newcode = req.body.newcode;

        //!Validations-----------------------------------------------------------------------------------

        isValid = true;
        errormsj = {};

        
        if(!oldcode || !newcode){
            errormsj.empty = "Parece que dejaste un espacio en blanco";
            isValid = false;
        }
        if(newcode.length < 5 && isValid){
            errormsj.codelen = "El nuevo codigo debe ser de al menos 5 caracteres";
            isValid = false;
        }

        //!Validations-----------------------------------------------------------------------------------

        if(isValid){
            CodeModel.findbyCode(oldcode)
            .then(data=>{
                if(data){
                        if(data.identifier === "Total"){
                        newCode = {
                            code: req.body.newcode
                        }
                        CodeModel.updateCode("Total",newCode)
                        .then(result =>{
                            res.status(200).json({success: "✅ El codigo TOTAL fue actualizado"});
                        })
                        .catch(err=>{
                            errormsj = {
                                codeUsed: "📍 Porfavor intenta con otro codigo"
                            }
                            console.log(err);
                            res.status(400).json(errormsj);
                        })
                    }
                    else{
                        res.status(400).json({wrongoldcode: "📍 El codigo anterior no es correcto"});
                    }
                }
                else{
                    res.status(400).json({wrongoldcode: "📍 El codigo anterior no es correcto"});
                }
                
            })
            .catch(err=>{
                res.status(404).end()
                console.log(err);
            })
        }
        else{
            res.status(400).json(errormsj)
        }
    },

    updateNCode: function (req,res) {

        oldcode = req.body.oldcode;
        newcode = req.body.newcode;

        //!Validations-----------------------------------------------------------------------------------

        isValid = true;
        errormsj = {};

        
        if(!oldcode || !newcode){
            errormsj.empty = "Parece que dejaste un espacio en blanco";
            isValid = false;
        }
        if(newcode.length < 5 && isValid){
            errormsj.codelen = "El nuevo codigo debe ser de al menos 5 caracteres";
            isValid = false;
        }

        //!Validations-----------------------------------------------------------------------------------

        if(isValid){
            CodeModel.findbyCode(oldcode)
            .then(data=>{
                if(data){
                    if(data.identifier === "Normal"){
                        newCode = {
                            code: req.body.newcode
                        }
                        CodeModel.updateCode("Normal",newCode)
                        .then(result =>{
                            res.status(200).json({success: "✅ El codigo NORMAL fue actualizado"});
                        })
                        .catch(err=>{
                            errormsj = {
                                codeUsed: "📍 Porfavor intenta con otro codigo"
                            }
                            res.status(400).json(errormsj);
                        })
                    }
                    else{
                        res.status(400).json({wrongoldcode: "📍 El codigo anterior no es correcto"});
                    }
                }
                else{
                    res.status(400).json({wrongoldcode: "📍 El codigo anterior no es correcto"});
                }
            })
            .catch(err=>{
                res.status(404).end()
            })
        }
        else{
            res.status(400).json(errormsj)
        }

    },

    updateRCode: function (req,res) {

        oldcode = req.body.oldcode;
        newcode = req.body.newcode;

        //!Validations-----------------------------------------------------------------------------------

        isValid = true;
        errormsj = {};

        
        if(!oldcode || !newcode){
            errormsj.empty = "Parece que dejaste un espacio en blanco";
            isValid = false;
        }
        if(newcode.length < 5 && isValid){
            errormsj.codelen = "El nuevo codigo debe ser de al menos 5 caracteres";
            isValid = false;
        }

        //!Validations-----------------------------------------------------------------------------------

        if(isValid){
            CodeModel.findbyCode(oldcode)
            .then(data=>{
                if(data){
                    if(data.identifier === "Register"){
                        newCode = {
                            code: req.body.newcode
                        }
                        CodeModel.updateCode("Register",newCode)
                        .then(result =>{
                            res.status(200).json({success: "✅ El codigo de REGISTROS fue actualizado"});
                        })
                        .catch(err=>{
                            errormsj = {
                                codeUsed: "📍 Porfavor intenta con otro codigo"
                            }
                            res.status(400).json(errormsj);
                        })
                    }
                    else{
                        res.status(400).json({wrongoldcode: "📍 El codigo anterior no es correcto"});
                    }
                }
                else{
                    res.status(400).json({wrongoldcode: "📍 El codigo anterior no es correcto"});
                }
            })
            .catch(err=>{
                res.status(404).end()
            })
        }
        else{
            res.status(400).json(errormsj)
        }

    }
}

module.exports = { CodesController };