const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, ' description is required']
    },
    image: {
        type: String,
        required: [true, 'image is required']
    },
    // maintaing relation between user and blog, here get user from userModel by the use of mongoose
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        // required: [true, 'user id is required']
    }
}, { timestamps: true })
const blogModel = mongoose.model('Blog', blogSchema);
module.exports = blogModel