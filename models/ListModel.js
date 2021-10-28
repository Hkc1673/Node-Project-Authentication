const mongoose = require("mongoose");

const todoListSchema = mongoose.Schema({
    userId: String,
    title: String,
    describe: String,
    pomodoro: String,
    category: {
        type: String,
        default: "Common"
    },
    completed: {
        type: Boolean,
        default: false,
    },
    markedDates: [
        {
            date: String,
            marked: {
                type: Boolean,
            },
            dotColor: {
                type: String,
            },
            startingDay: {
                type: Boolean,
            },
            textColor: {
                type: String,
            },
            color: {
                type: String,
            },
            endingDay: {
                type: Boolean,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const List = mongoose.model("List", todoListSchema);

module.exports = List;
