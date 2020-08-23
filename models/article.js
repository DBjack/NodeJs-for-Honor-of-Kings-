const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: { type: String },
    parent: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category",
    },
    content: {
        type: String,
    },
});

module.exports = mongoose.model("Article", schema);