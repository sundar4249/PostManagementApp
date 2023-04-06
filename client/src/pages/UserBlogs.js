import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostCard from '../components/PostCard';

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    //Get user blog
    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('userId')
            const { data } = await axios.get(`http://localhost:8800/api/v1/blog/user-blog/${id}`)
            if (data?.success) {
                setBlogs(data?.userBlog.blogs)   // userBlog geting from userBlogController
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserBlogs();
    }, [])
    console.log(blogs);
    return (
        <div>
            {blogs && blogs.length > 0 ? (blogs.map((blog) => (<PostCard
                title={blog.title}
                description={blog.description}
                image={blog.image}
                username={blog?.user?.username}
                time={blog.createdAt}
            />))
            ) : (<div style={{ textAlign: 'center' }}><h1>You have not Posted any Blog</h1></div>)}
        </div>
    )
}

export default UserBlogs