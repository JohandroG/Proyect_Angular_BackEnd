const express = require( 'express' );
const AdminRouter = express.Router();
const {AdminsController} = require( './../controllers/adminController' );

//!-----------Routes----------------------------------------------------------------

AdminRouter.route('/recoverpass').post(AdminsController.sendEmail_forgotpass);

AdminRouter.route('/changepass').post(AdminsController.changepassword);

AdminRouter.route('/create').post(AdminsController.createNewAdmin);

AdminRouter.route('/login').post(AdminsController.login);


//!-----------Routes----------------------------------------------------------------

module.exports = { AdminRouter };