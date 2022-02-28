const { body, validationResult } = require('express-validator');


PhoneValidator = {

//*---VALIDATORS FOR UPDATING A NUMBER----------------------------------------------
    updateNumberVal : [
        body('publisher').isLength({min:2}).withMessage('El nombre del publicador debe ser de al menos 2 caracteres'),
        body('notes').isLength({max:200}).withMessage('La Nota debe ser de máximo 200 caracteres'),
        body('publisher').exists({checkFalsy: true}).withMessage('Uno de los espacios requeridos esta en blanco'),
        body('info').exists({checkFalsy: true}).withMessage('Uno de los espacios requeridos esta en blanco')
    ],

//*---VALIDATORS FOR...----------------------------------------------
}

module.exports = { PhoneValidator };



