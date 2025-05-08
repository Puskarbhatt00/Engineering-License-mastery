import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true,
        validate: [arrayLimit, 'Options must contain exactly 4 items']
    },
    correctAnswer: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D']
    },
    category: {
        type: String,
        required: true,
        index: true // Add index for better performance
    }
});

function arrayLimit(val) {
    return val.length === 4;
}

const Question = mongoose.model("Question", questionSchema);
export default Question;
