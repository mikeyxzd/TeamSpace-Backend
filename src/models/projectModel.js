const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    Description: {
        type: String,
        required: true,
        trim: true,
    },
    Image: {
        type: String,
        required: true,
        trim: true,
    },
    Url: {
        type: String,
        required: true,
        trim: true,
    },
});

module.exports = mongoose.model("Project", projectSchema);