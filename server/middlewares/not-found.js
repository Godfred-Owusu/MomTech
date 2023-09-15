const routeNotFound = (req, res ) => res.status(404).json({
     success: false,
     msg: "Route not found!"
})


module.exports = routeNotFound