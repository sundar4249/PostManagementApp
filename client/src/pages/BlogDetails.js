import React, { useState, useEffect } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
const BlogDetails = () => {
    const [blog, setBlog] = useState({})
    const id = useParams().id
    const nagivate = useNavigate()
    const [inputs, setInputs] = useState({
        // title: '',
        // description: '',
        // image: ''
    })
    // get blog Details
    const getSingleBlogDetails = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8800/api/v1/blog/get-blog/${id}`)
            if (data?.success) {
                setBlog(data?.blog) // blog is comming from getBlogByIdController (node server)
                setInputs({
                    title: data?.blog?.title,
                    description: data?.blog?.description,   // get the value in form when clicked on edit button
                    image: data?.blog?.image
                })
            }

        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        getSingleBlogDetails()

    }, [id])
    console.log(blog)
    //input Change
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // form submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        try {
            const { data } = await axios.put(`http://localhost:8800/api/v1/blog/update-blog/${id}`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id
            })
            if (data?.success) {
                toast.success('Post updated')
                nagivate('/my-posts')
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box width={'50%'} border={3} borderRadius={10} padding={3} margin={'auto'}
                    boxShadow={'10px 10px 20px #ccc'} display='flex' flexDirection={'column'} marginTop={2}>
                    <Typography variant='h2' textAlign={'center'} fontWeight={'bold'} padding={2} color={'greenyellow'}>
                        update Post
                    </Typography>
                    <InputLabel sx={{ mb: 1, mt: 1, fontSize: '22px', fontWeight: 'bold' }}>Title
                    </InputLabel>
                    <TextField name='title' value={inputs.title} onChange={handleChange} margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 1, mt: 1, fontSize: '22px', fontWeight: 'bold' }}>Description
                    </InputLabel>
                    <TextField name='description' value={inputs.description} onChange={handleChange} margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 1, mt: 1, fontSize: '22px', fontWeight: 'bold' }}>Image URL
                    </InputLabel>
                    <TextField name='image' value={inputs.image} onChange={handleChange} margin='normal' variant='outlined' required />
                    <Button type='submit' color='warning' variant='contained'>UPDATE</Button>
                </Box>

            </form>
        </>
    )
}

export default BlogDetails