const {StatusCodes} = require('http-status-codes')
const {CustomError} = require('../error')
const errorHandler = (err, req, res, next) => {
     const customError = {
          statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
          msg: "Something went wrong. Please try again later!"
      }
      if (err instanceof CustomError) {
          return res.status(err.statusCode).json({
              success: false,
              msg: err.message
          })
      }
      if (err.name === 'ValidationError') {
          customError.msg = Object.values(err.errors)
              .map((item) => item.message)
              .join(',')
          customError.statusCode = 400
      }
      if (err.code && err.code === 11000) {
          customError.msg = `Duplicate value entered for ${Object.keys(
          err.keyValue
      )} field, please choose another value`
          customError.statusCode = 400
      }
      if (err.name === 'CastError') {
          customError.msg = `No item found with id : ${err.value}`
          customError.statusCode = 404
      }
  
      return res.status(customError.statusCode).json({
          success: false,
          msg: customError.msg
      })
  
}




module.exports = errorHandler