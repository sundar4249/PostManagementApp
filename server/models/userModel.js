const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'User name is required']
    },
    email: {
        type: String,
        required: [true, 'email Id is required']
    },
    password: {
        type: String,
        required: [true, 'Valid password is requied']
    },
    // maintaing relation between user and blog, here get blog from blogModel by the use of mongoose
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Blog',
    }]
}, { timestamps: true })
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;