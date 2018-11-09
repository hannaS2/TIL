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
    userId: {
        type: String
    }
    
}, {
    versionKey: false
});

Task.statics.saveTask = async function (data) {
    
}

module.exports = mongoose.model("Task", Task);