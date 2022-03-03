//* REQUIRES
const mongoose = require('mongoose');


//*----------------CONSTRUCTOR-------------------------------------------------------------------------------------
const PhoneSchema = new mongoose.Schema({

    number :{
        type : String,
        required : true,
        unique : true
    },

    publisher : {
        type : String,
        default : null
    },

    info : {
        type : String,
        default: null
    },

    type : {
        type : String,
        default: null
    },

    notes : {
        type : String,
        default: null,
        maxlength: 500
    },

    calling : {
        type : Boolean,
        default: false
    },

    called : {
        type : Boolean,
        default: false
    },

    updated_at : {
        type : Date,
        required : true
    },

    user : {
        type : String,
        required : true
    }


});
//*----------------CONSTRUCTOR END----------------------------------------------------------------------------------

//*CONNECT COLLECTION
const Phone = mongoose.model( 'phones', PhoneSchema );

//*----------------QUERYS------------------------------------------------------------------------------------------

//?----------------(QUERYS FOR USERS)----------------------------
const PhoneModel = {

    findallPhones: function() {
        return Phone.find();
    },

    findUnusedNumber: function(){
        return Phone.findOne({calling: false , called: false})
    },
    findmMyResevedNum: function(user){
        return Phone.find({user: user , info: "Está Reservado"})
    },

    createNotice : function(newNotice) {
        return Phone.create(newNotice) 
    },
    getNoticeByTitle : function( title ){
        return Phone.findMany({ title });
    },
    findNoticeByID : function( _id  ){
        return Phone.findOne({ _id  });
    },
    deleteNoticeByID : function( _id ){
        return Phone.findOneAndDelete({ _id  });
    },
    updatePhone: function(_id, phoneupdated){
        return Phone.findOneAndUpdate({_id}, {$set : phoneupdated}, {new:true})
    },
    updatePhones: function(search_condition, phoneupdated){
        return Phone.updateMany(search_condition, {$set : phoneupdated}, {new:true})
    },

    //TODO INSERT MORE QUERYS

}

//*----------------QUERYS END--------------------------------------------------------------------------------------

//* EXPORT MODEL (QUERY OBJECTS)
module.exports = {PhoneModel};