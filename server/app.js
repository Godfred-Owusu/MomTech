require('dotenv').config()
require('express-async-errors')
const express = require('express')
const sessions = require('express-sessions')

const server = express()
const port = process.env.PORT || 50001

//middleware
server.use(sessions({
     name: 'mom_sid',
     secure: true
}))

server.use('/', (req, res) => res.send("Welcome to momTech buddy! Time to rock and roll!"))

const initiate = (() => {
     try {
          server.listen(port, () => {
               console.log(`Server is up and running on port: ${port}`)
          })
     } catch (error) {
          console.log(error.message)
     }
     
})()


module.exports = server