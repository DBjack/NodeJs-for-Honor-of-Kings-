module.exports = (options) => {
    return async(req, res, next) => {
        modelName = require("inflection").classify(req.params.resource);
        next();
    };
};