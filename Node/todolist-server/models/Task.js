const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Task = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    deadline: {
        type: Date
    },
    
}, {
    versionKey: false
});

module.exports = mongoose.model("Task", Task);