const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: { type: String },
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category",
    }, ],
    body: {
        type: String,
    },
}, {
    // 时间戳
    timestamps: true,
});

module.exports = mongoose.model("Article", schema);