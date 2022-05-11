//* REQUIRES
const mongoose = require('mongoose');


//*----------------CONSTRUCTOR-------------------------------------------------------------------------------------
const PushTokenSchema = new mongoose.Schema({

    token :{
        type : String,
        required : true,
        unique : true
    }

});
//*----------------CONSTRUCTOR END----------------------------------------------------------------------------------

//*CONNECT COLLECTION
const Token = mongoose.model( 'push-tokens', PushTokenSchema );

//*----------------QUERYS------------------------------------------------------------------------------------------

//?----------------(QUERYS FOR USERS)----------------------------
const PushTokenModel = {

    findallTokens: function() {
        return Token.find();
    },
    createToken : function(newToken) {
        return Token.create(newToken) 
    },
    findTokenByID : function( _id  ){
        return Token.findOne({ _id  });
    }

    //TODO INSERT MORE QUERYS

}

//*----------------QUERYS END--------------------------------------------------------------------------------------

//* EXPORT MODEL (QUERY OBJECTS)
module.exports = {PushTokenModel};