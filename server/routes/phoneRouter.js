const express = require( 'express' );
const PhoneRouter = express.Router();
const {PhoneController} = require( './../controllers/phoneController' );
const {PhoneValidator} = require( '../validators/phoneValidator' );

PhoneRouter.route('/get/num').get(PhoneController.getUnusedNumber)
PhoneRouter.route('/get/allnum').get(PhoneController.getAllNums)


PhoneRouter.route('/update/num').put(PhoneValidator.updateNumberVal,PhoneController.updateNumber)

module.exports = { PhoneRouter };