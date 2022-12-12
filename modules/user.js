const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    token: {
        type: Number,
        required: true,
    },
});

const User = mongoose.model("userData", userSchema);
module.exports = User