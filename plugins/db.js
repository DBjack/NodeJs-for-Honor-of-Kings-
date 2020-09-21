module.exports = (app) => {
    const mongoose = require("mongoose");
    mongoose.connect("mongodb://127.0.0.1:27017/vue-node-mongodb", {
        useNewUrlParser: true,
    });
    console.log(__dirname + "/../models");
    require("require-all")(__dirname + "/../models");
};