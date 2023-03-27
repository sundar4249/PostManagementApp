const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');

// Get all blogs
exports.getgetAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({})
        //check if not blog
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: 'Blogs not found',
            })
        }
        return res.status(200).send(({
            success: true,
            blogCount: blogs.length,
            message: 'List of all blogs',
            blogs
        }))

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error while getting blog',
            error
        })
    }

}

//creat blogs
exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        //validation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: 'please provide all fields',
            });
        }
        //check user
        const existingUser = await userModel.findById(user)
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'user not found',
            })
        }
        const newBlog = new blogModel({ title, description, image, user });
        const session = await mongoose.startSession();
        // session.startTransaction();
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);
        await existingUser.save({ session });
        // await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success: true,
            message: 'Blog created',
            newBlog,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error while creating blog',
            error,
        })

    }

}

//update blog
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body },
            { new: true }
        );
        return res.status(200).send({
            success: true,
            message: 'Blog updated',
            blog,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error while updating blog',
            error,
        })
    }
}

//Get single blog details by id
exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'no blog found bt this id',
            })
        }
        return res.status(200).send({
            success: true,
            message: 'blog fetched',
            blog
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error while getting single blog by ID',
            error,
        })
    }
}

//delete blog
exports.deleteBlogIdcontroller = async (req, res) => {
    try {
        const { id } = req.params;
        await blogModel.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: 'Blog deleted',
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error while deleting blog',
            error
        })
    }

}