//rafce (this the shortcut keys to create arrow function with import and export)
import React, { useState } from 'react'
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../redux/store'

const Header = () => {
    //global state
    const isLogin = useSelector(state => state.isLogin)
    console.log(isLogin);
    const dispatch = useDispatch()
    const nagivate = useNavigate()
    //normal state
    const [value, setValue] = useState('')

    //function for logout
    const handleLogout = async () => {
        try {
            dispatch(authActions.logout())
            alert('Logout successfully')
            nagivate('/login')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <AppBar position='sticky' style={{ backgroundColor: '#01243a' }}>
                <Toolbar >
                    <Typography variant='h4'>
                        Post Management APP
                    </Typography>
                    {isLogin && (<Box display={'flex'} marginLeft='auto' marginRight='auto' >
                        <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
                            <Tab label='All Posts' LinkComponent={Link} to='/posts' />
                            <Tab label='My posts' LinkComponent={Link} to='/my-posts' />
                            <Tab label='Create Posts' LinkComponent={Link} to='/create-posts' />
                        </Tabs>
                    </Box>
                    )}
                    <Box display={'flex'} marginLeft='auto'>
                        {!isLogin && (<> <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to='/login' >Login</Button>
                            <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to='/signup'  >Signup</Button></>)}
                        {isLogin && (<Button onClick={handleLogout} sx={{ margin: 1, color: 'white' }}>Logout</Button>)}
                    </Box>
                </Toolbar>

            </AppBar>
        </>
    )
}

export default Header