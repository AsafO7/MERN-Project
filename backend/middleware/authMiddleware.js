const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token
    // Valid tokens start with 'Bearer nv34n698743cn89c37(the token itself)
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token (we get decoded.id from userController -> generateToken())
            // select('-password') means don't include the password in the returned object
            req.user = await User.findById(decoded.id).select('-password')
            next()
        }
        catch(err) {
            console.log(err)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = protect