const express = require( 'express' );
const NoticeRouter = express.Router();
const {NoticesController} = require( './../controllers/noticesController' );

// //!-----------Routes----------------------------------------------------------------

//*GET
NoticeRouter.route('/galln').get(NoticesController.requestallNotices);
NoticeRouter.route('/findn/:_id').get(NoticesController.findNotice);

NoticeRouter.route('/notice/image/:key').get(NoticesController.getimages);

//*POST
NoticeRouter.route('/create').post(NoticesController.createNotice);
//

//*PUT
NoticeRouter.route('/update/:id').put(NoticesController.updatenotice);

//*DELETE
NoticeRouter.route('/delete/:id').delete(NoticesController.deletenotice);

NoticeRouter.route('/removeimg/:id').delete(NoticesController.deleteIMG);



// //!-----------Routes----------------------------------------------------------------

module.exports = { NoticeRouter };