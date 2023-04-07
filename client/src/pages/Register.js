import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Register = () => {
    const nagivate = useNavigate()
    const [input, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    }
    )
    //handle input change
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    //form handle
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`http://localhost:8800/api/v1/user/register`, {
                username: input.name,
                email: input.email,
                password: input.password
            })
            if (data.success) {
                toast.success('user Registered successfully')
                nagivate('/login')
            }

        } catch (error) {
            console.log(error)

        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    maxWidth={450}
                    display='flex'
                    flexDirection={'column'}
                    alignItems='center'
                    justifyContent={'center'}
                    margin='auto'
                    marginTop={3}
                    boxShadow='10px 10px 20px #ccc'
                    padding={3}
                    borderRadius={3}
                >
                    <Typography variant='h4' padding={3} sx={{ textTransform: 'upperCase' }} textAlign='center'>Register</Typography>
                    <TextField placeholder='User name'
                        value={input.name}
                        name='name'
                        margin='normal'
                        type={'text'}
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        placeholder='email'
                        value={input.email}
                        name='email'
                        margin='normal'
                        type={'email'}
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        placeholder='password'
                        value={input.password}
                        name='password'
                        margin='normal'
                        type={'password'}
                        required
                        onChange={handleChange}
                    />
                    <Button
                        type='Submit'
                        sx={{ borderRadius: 3, margineTop: 2 }}
                        variant='contained'
                        color='primary'
                    >Submit</Button>
                    <Button
                        onClick={() => nagivate('/login')}
                        type='Submit'
                        sx={{ borderRadius: 3, margineTop: 3 }}
                        color='primary'>Already Registered?. Please Login</Button>
                </Box>
            </form>
        </>
    )
}

export default Register