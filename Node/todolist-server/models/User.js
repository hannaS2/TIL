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
});

module.exports = mongoose.model("User", User);