var mongoose = require("mongoose");


//! FOR DEV PURPOSES
// mongoose.connect("mongodb://localhost/noticeboard");


//!FOR PROD PORPOSES
mongoose.connect("mongodb+srv://johang:201010jk@cluster0.anbzh.mongodb.net/NoticeBoard?retryWrites=true&w=majority");
