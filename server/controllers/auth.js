const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const { BadRequestError, UnAuthorized } = require('../error')

const checkEmail = async (req, res) => {
     const {user_email} = req.body
     const user = await User.findOne({user_email})
     if (user){
          throw new BadRequestError(`Mom with email: ${user_email} already exits.`)
     }

     res.status(StatusCodes.OK).json({
          success: true,
          message: "Email is brand new."
     })
}


const verifyEmail = async (req, res) => {
     const {user_id} = req.body
     res.status(StatusCodes.OK).json({
          success: true,
          message: "User verified successfully!"
     })
}

const register = async (req, res) => {
     const {
          user_email,
          user_first_name, 
          user_last_name
     } = req.body

     const registered_user = await User.create({
          ...req.body,
          user_name: `${user_first_name} ${user_last_name}`
     })

     res.status(StatusCodes.CREATED).json({
          success: true,
          data: {user_email, _id: registered_user._id}
     })
}


const login = async (req, res) => {
     const {user_password, user_email} = req.body
     const user = await User.findOne({user_email})
     
     if(!user) {
          throw new UnAuthorized("Invalid Credentials. Please register.")
     }

     const is_valid_password = await user.verifyPassword(user_password)

     if (!is_valid_password)  {
          throw new UnAuthorized("Invalid Credentials. Please register.")
     }
     const {user_first_name, _id} = user
     res.status(StatusCodes.OK).json({
          success: true,
          data: {
               user_email,
               user_first_name,
               _id
          }
     })
}


module.exports = {
     login,
     register,
     verifyEmail,
     checkEmail
}