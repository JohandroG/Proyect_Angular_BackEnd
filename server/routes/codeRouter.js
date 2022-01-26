const express = require( 'express' );
const CodeRouter = express.Router();
const {CodesController} = require( './../controllers/codesController' );

//!-----------Routes----------------------------------------------------------------

//? FOR DEV PURPOSES
// CodeRouter.route('/total').get(CodesController.createTCode);

// CodeRouter.route('/normal').get(CodesController.createNCode);
//? -------------------------------------------------------------------------

CodeRouter.route('/updateregister').put(CodesController.updateRCode);

CodeRouter.route('/updatetotal').put(CodesController.updateTCode);

CodeRouter.route('/updatenormal').put(CodesController.updateNCode);

//!-----------Routes----------------------------------------------------------------

module.exports = { CodeRouter };