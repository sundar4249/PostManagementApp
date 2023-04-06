import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    //get all post
    const getAllPost = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8800/api/v1/blog/all-blog`)
            if (data?.success) {
                setBlogs(data?.blogs)
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllPost();

    }, [])
    return (
        <div>
            {blogs && blogs.map((blog) => <PostCard
                title={blog.title}
                description={blog.description}
                image={blog.image}
                username={blog?.user?.username}
                time={blog.createdAt} />)}


        </div>
    )
}

export default Blogs