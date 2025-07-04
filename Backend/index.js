require('dotenv').config()

const express = require('express')
const cors = require('cors')
const authRouter = require('./Router/auth-router.js')
const connectDB = require('./utils/Database.js')
const app = express() 

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions)) ;
app.use(express.json()) 


app.use('/api', authRouter)

const port = 5000 ;

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log("Server is Running")
    })
})