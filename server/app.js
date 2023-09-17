const express = require('express')
require('dotenv').config()
require('express-async-errors')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const notFoundMiddleware = require('./middlewares/not-found')
const authRoutes = require('./routes/auth')
const sessions = require('express-sessions')
const connectDB = require('./db/connectDB')

const server = express()
const port = process.env.PORT || 50001

//middleware
server.use(express.json())
// server.use(sessions({
//      name: 'mom_sid',
//      secure: true
// }))


// Routes
server.use('/api', authRoutes)



//custom-error-handling middleware
server.use(errorHandlerMiddleware) //must be at bottom 
server.use(notFoundMiddleware) //so it stays as last resort when all else fail

const initiate = ( async () => {
     try {
          await connectDB()
          server.listen(port, console.log(`Server is listening on port: ${port}`))
     } catch (error) {
          console.log(error)
     }
     
})()


module.exports = server