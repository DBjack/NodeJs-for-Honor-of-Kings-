module.exports = (options) => {
    return async(req, res, next) => {
        console.log(req.params);
        const modelName = require("inflection").classify(req.params.resource);
        console.log(modelName);
        req.Model = require(`../models/${modelName}`);
        next();
    };
};