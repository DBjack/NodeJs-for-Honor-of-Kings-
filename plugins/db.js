module.exports = (app) => {
    const mongoose = require("mongoose");
    mongoose.connect("mongodb://119.45.43.3:27017/honor-of-kings", {
        useNewUrlParser: true,
    });
};