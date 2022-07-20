const jsonwebtoken = require('jsonwebtoken')
const secrets = require('../utils/secrets')


const isAuth = (req, res, next) => {
    try {
        const jwt = req.headers.token
        if (!jwt) {
            throw new Error('Not logged in')
        }
        const payload = jsonwebtoken.verify(jwt, secrets.jwt)
        req.token = payload
    } catch (err) {
        return next(err)
    }
    next()
}




module.exports = {
    isAuth,
    
}
