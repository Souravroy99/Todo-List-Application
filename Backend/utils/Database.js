const mongoose = require('mongoose')

const URL = process.env.MongoDB_URL 

const connectDB = async() => {
    try{
        await mongoose.connect(URL) ;
        console.log("Database is Successfully connected.")
    }   
    catch(error){
        console.log("Connection with database is unsuccessfull.") ;
        process.exit(0) ;
    }
}
 
module.exports = connectDB ;