const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const policyRoutes =require('./routes/policies')
const authRoutes = require('./routes/auth')

const app = express()

app.use(cors())
app.use(express.json())


app.use('/api/policies', policyRoutes)
app.use('/api/auth', authRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`)
        })
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error)
    })