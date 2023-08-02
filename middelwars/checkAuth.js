const { HttpError } = require("../hellpers");
const jwt = require('jsonwebtoken')

const {SECRET_KEY} = process.env;

const checkAuth = async (req, res, next) => {
try {
    const headerAuth = req.headers.authorization;
if(!headerAuth){
    throw HttpError(401, "Not authorization")
}
const [bearer, token] = headerAuth.split(" ", 2)
if(bearer !== "Bearer"){
    throw HttpError(401, "Not authorization")
}
await jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if(err) {
        throw HttpError(401, "Not authorization")
    }
    req.userId = decoded;
    next()
})
} catch (error) {
    next(error)
}
}

module.exports = checkAuth;