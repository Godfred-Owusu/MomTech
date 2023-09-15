require('dotenv').config()
require('express-async-errors')
const express = require('express')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const notFoundMiddleware = require('./middlewares/not-found')
const sessions = require('express-sessions')

const server = express()
const port = process.env.PORT || 50001

//middleware
server.use(sessions({
     name: 'mom_sid',
     secure: true
}))

server.use('/', (req, res) => res.send("Welcome to momTech buddy! Time to rock and roll!"))


//custom-error-handling middleware
server.use(errorHandlerMiddleware) //must be at bottom 
server.use(notFoundMiddleware) //so it stays as last resort when all else fail

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