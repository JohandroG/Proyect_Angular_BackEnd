//* REQUIRES
const mongoose = require('mongoose');


//*----------------CONSTRUCTOR-------------------------------------------------------------------------------------
const AdminSchema = new mongoose.Schema({

    firstname :{
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },

    lastname : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    username : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    admintype : {
        type : String,
        required : true
    },

    recoverToken : {
        type : String,
        default: null
    },


});
//*----------------CONSTRUCTOR END----------------------------------------------------------------------------------

//*CONNECT COLLECTION
const Admin = mongoose.model( 'admins', AdminSchema );


//*----------------QUERYS------------------------------------------------------------------------------------------

//?----------------(QUERYS FOR USERS)----------------------------
const AdminModel = {

    createAdmin : function(newUser) {
        return Admin.create(newUser) 
    },
    getAdminByUsername : function( username ){
        return Admin.findOne({ username });
    },
    getAdminByEmail : function( email ){
        return Admin.findOne({ email });
    },
    getAdminByID : function( _id ){
        return Admin.findOne({ _id });
    },
    updateadmin: function(_id, adminupdated){
        return Admin.findOneAndUpdate({_id}, {$set : adminupdated}, {new:true})
    },

    //TODO INSERT MORE QUERYS

}

//*----------------QUERYS END--------------------------------------------------------------------------------------

//* EXPORT MODEL (QUERY OBJECTS)
module.exports = {AdminModel};