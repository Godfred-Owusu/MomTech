const {StatusCodes} = require('http-status-codes')
const {CustomError} = require('../error')
const errorHandler = (err, req, res, next) => {
     if (err instanceof CustomError){
          res.status(err.statusCode).json({
               success: false,
               msg: err.message
          })
     }
}




module.exports = errorHandler