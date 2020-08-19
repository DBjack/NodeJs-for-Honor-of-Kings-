const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: { type: String },
    // 头像
    avatar: { type: String },
    title: { type: String },
    // 可能属于多个分类
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category",
    }, ],
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survice: { type: Number },
    },
    skills: [{
        icon: {
            type: String,
        },
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        tips: {
            type: String,
        },
    }, ],
    items1: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Item",
    }, ],
    items2: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Item",
    }, ],
    useTips: {
        type: String,
    },
    battleTips: {
        type: String,
    },
    teamTips: {
        type: String,
    },
    partnets: [{
        heros: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Hero",
        },
        description: {
            type: String,
        },
    }, ],
});

module.exports = mongoose.model("Hero", schema);