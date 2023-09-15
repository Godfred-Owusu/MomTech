const {StatusCodes} = require('http-status-codes')

class CustomError extends Error{
     constructor(message){
          super(message)
          this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
     }
}

module.export = CustomError