const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: Number,
});

const Token = mongoose.model("token", tokenSchema);
module.exports = Token