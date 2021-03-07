var express = require('express');
var router = express.Router();
const { checkSchema, validationResult } = require('express-validator');

/* GET users listing. */
router.post('/',
    checkSchema({
        firstName:{
            in: ['body'],
            errorMessage: 'Failed validating first name.',
            notEmpty: true,
        },
        race:{
            in: ['body'],
            errorMessage: 'Failed validating race.',
            notEmpty: true,
        },
        species:{
            in: ['body'],
            errorMessage: 'Failed validating species.',
            notEmpty: true,
            custom: {
                options: input => {
                    return new Promise((resolve, reject) => {
                        ['Dog','Cat','Horse'].includes(input) ? resolve(input) : reject('Failed validating species');
                    })
                }
            }
        },
        gender:{
            in: ['body'],
            errorMessage: 'Failed validating gender.',
            notEmpty: true,
            custom: {
                options: input => {
                    return new Promise((resolve, reject) => {
                        ['Male','Female'].includes(input) ? resolve(input) : reject('Failed validating gender');
                    })
                }
            }
        },
        'reminder': {
            in: ['body'],
            errorMessage: 'Failed validating petWalkInfo.reminder.',
            isBoolean:true
        }

    }),function(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }else {
            res.send('Request Processed Successfully');
        }
});

module.exports = router;
