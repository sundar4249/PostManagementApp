const mongoose = require('mongoose');


const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`sucessfully connected to mongoDB ${mongoose.connection.host}`)
    }catch (error){
        console.log(`Error with mongo connection ${error}`)
    }
}
module.exports = connectDb;