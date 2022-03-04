var mongoose = require("mongoose");


//! FOR DEV PURPOSES
// mongoose.connect("mongodb://localhost/NoticeBoard");


//!FOR PROD PORPOSES
mongoose.connect(process.env.MONGOATLASLOG);
