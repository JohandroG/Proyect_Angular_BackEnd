const express = require( 'express' );
const PushTokenRouter = express.Router();
const {PushTokenController} = require( './../controllers/pushTokenController' );

//!-----------Routes----------------------------------------------------------------


PushTokenRouter.route('/save').post(PushTokenController.savePush)
// PushTokenRouter.route('/send').get(PushTokenController.sendPush)

//!-----------Routes----------------------------------------------------------------

module.exports = { PushTokenRouter };