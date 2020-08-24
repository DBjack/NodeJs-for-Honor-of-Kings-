const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: { type: String },
    advert: [{
        icon: { type: String },
        url: { type: String },
        description: { type: String },
        tips: { type: String }
    }]
});

module.exports = mongoose.model("Advert", schema);