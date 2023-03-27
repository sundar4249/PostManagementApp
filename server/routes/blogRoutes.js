const express = require('express');
const { getgetAllBlogsController,
    createBlogController,
    updateBlogController,
    getBlogByIdController,
    deleteBlogIdcontroller } = require('../contollers/blogController');

//router object
const router = express.Router()

//routes

//Get || all blogs
router.get('/all-blog', getgetAllBlogsController);

//post || creat blogs
router.post('/create-blog', createBlogController);

//put || update blog
router.put('/update-blog/:id', updateBlogController);

//Get || single blog details by id
router.get('/get-blog/:id', getBlogByIdController);

//Delete || delete blog
router.delete('/delete-blog/:id', deleteBlogIdcontroller);

module.exports = router;