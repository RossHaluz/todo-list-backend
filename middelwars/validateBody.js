const { HttpError } = require("../hellpers");

const validateBody = schema => {
    const func = (req, res, next) => {
       const {error} = schema.validate(req.body);
       if(error) {
        const errorName = error.details.map(item => item.message);
        console.log(errorName);
        throw HttpError(400, errorName[0])
       }
       next()
    }

    return func;
}

module.exports = {
    validateBody
}