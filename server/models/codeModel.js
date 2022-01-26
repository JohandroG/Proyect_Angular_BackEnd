//* REQUIRES
const mongoose = require('mongoose');


//*----------------CONSTRUCTOR-------------------------------------------------------------------------------------
const CodeSchema = new mongoose.Schema({


    name :{
        type : String,
        required : true,
    },

    code :{
        type : String,
        required : true,
        unique: true,
        minlength : 3,
        maxlength : 20
    },

    identifier : {
        type : String,
        required : true,
    },

});
//*----------------CONSTRUCTOR END----------------------------------------------------------------------------------

//*CONNECT COLLECTION
const Code = mongoose.model( 'codes', CodeSchema );


//*----------------QUERYS------------------------------------------------------------------------------------------

//?----------------(QUERYS FOR USERS)----------------------------
const CodeModel = {

    createCode : function(newUser) {
        return Code.create(newUser) 
    },
    findMatch : function( code ){
        return Code.findOne({ code });
    },
    findbyIdenfier: function( identifier ){
        return Code.findOne({ identifier });
    },
    findbyCode: function( code ){
        return Code.findOne({ code });
    },
    updateCode: function(identifier, codeupdated){
        return Code.findOneAndUpdate({identifier}, {$set : codeupdated}, {new:true})
    },

    //TODO INSERT MORE QUERYS

}

//*----------------QUERYS END--------------------------------------------------------------------------------------

//* EXPORT MODEL (QUERY OBJECTS)
module.exports = {CodeModel};