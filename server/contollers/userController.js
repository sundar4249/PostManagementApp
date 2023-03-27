const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

//create User Register
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body
        //for validation
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'please fill all fields'
            })
        }
        // for existing user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: 'user is already register'
            })
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        // save new user
        const user = new userModel({ username, email, password: hashedPassword })
        await user.save()
        return res.status(201).send({
            success: true,
            message: 'New user created',
            user,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: 'Error in Register call back',
            success: false,
            error
        })

    }

}

//get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            success: true,
            message: 'all users data',
            userCount: users.length,
            users,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in get all user',
            error,
        })

    }
}

// for login
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(402).send({
                safalta: false,
                khabar: 'please provide valid email or password'
            })
        }
        //check user registration
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'email is not registered',
            })
        }
        //password match
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid user name or password'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'successfully Login',
            user
        })


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in login call back',
            error
        })

    }
}