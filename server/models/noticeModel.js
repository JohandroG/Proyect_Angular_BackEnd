//* REQUIRES
const mongoose = require('mongoose');


//*----------------CONSTRUCTOR-------------------------------------------------------------------------------------
const NoticeSchema = new mongoose.Schema({

    title :{
        type : String,
        required : true,
        minlength : 3,
        maxlength : 100
    },

    description : {
        type : String,
        required : true,
        minlength : 5
    },

    link : {
        type : String
    },

    importance : {
        type : Boolean,
        default : false
    },

    creator : {
        type : String,
        required : true
    },

    picture : {
        type : String,
        default: null
    },

    created_at : {
        type : Date,
        required : true
    },

    updated_at : {
        type : Date,
        required : true
    }


});
//*----------------CONSTRUCTOR END----------------------------------------------------------------------------------

//*CONNECT COLLECTION
const Notice = mongoose.model( 'notices', NoticeSchema );

//*----------------QUERYS------------------------------------------------------------------------------------------

//?----------------(QUERYS FOR USERS)----------------------------
const NoticeModel = {

    findallNotices: function() {
        return Notice.find();
    },

    createNotice : function(newNotice) {
        return Notice.create(newNotice) 
    },
    getNoticeByTitle : function( title ){
        return Notice.findMany({ title });
    },
    findNoticeByID : function( _id  ){
        return Notice.findOne({ _id  });
    },
    deleteNoticeByID : function( _id ){
        return Notice.findOneAndDelete({ _id  });
    },
    updatenotice: function(_id, noticeupdated){
        return Notice.findOneAndUpdate({_id}, {$set : noticeupdated}, {new:true})
    },

    //TODO INSERT MORE QUERYS

}

//*----------------QUERYS END--------------------------------------------------------------------------------------

//* EXPORT MODEL (QUERY OBJECTS)
module.exports = {NoticeModel};