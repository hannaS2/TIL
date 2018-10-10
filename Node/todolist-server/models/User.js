const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
}, {
    versionKey: false  // __v: 0 제거
});

module.exports = mongoose.model("User", User);