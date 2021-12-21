const express = require('express')

const cors = require('cors')

require('dotenv').config()
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 5000;

const userRouter = require('./routes/users')
const exerciseRouter = require('./routes/exercises')


app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser:true, useUnifiedTopology: true})

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB connection established successfully");
})


app.use('/users',userRouter)
app.use('/exercises',exerciseRouter)
app.listen(port, ()=>{
    console.log('Server is running on port :' + port);
})