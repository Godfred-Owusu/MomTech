const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
     user_name: {
          type: String,
          required: true,
     },
     user_first_name: {
          type: String,
          required: true 
     },
     user_last_name: {
          type: String,
          required: true
     },
     user_email: {
          type: String,
          required: true,
          unique: true,
          match: [
               /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
          ]
     },
     user_password: {
          required: true,
          type: String,
     },
     user_is_carrying: {
          type: Boolean,
          default: false
     },
     user_how_far_along: {
          type: String,
          default: 'Not specified'
     },
     user_has_completed_registration: {
          required: true,
          type: Boolean,
          default: false
     },
     user_has_verified_email: {
          type: Boolean,
          required: true,
          default: false
     }
}, {timestamps: true})


UserSchema.pre('save', async function(){
     const salt = await bcrypt.genSalt(10)
     this.user_password = await bcrypt.hash(this.user_password, salt)
})

UserSchema.methods.verifyPassword = function(user_input){
     return bcrypt.compare(user_input, this.user_password)
}

module.exports = mongoose.model("User", UserSchema)