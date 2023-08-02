const checkAuth = require("./checkAuth");
const { upload } = require("./upload");
const { validateBody } = require("./validateBody");

module.exports = {
    validateBody, 
    checkAuth, 
    upload
}