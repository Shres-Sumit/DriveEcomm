const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')


const userRoute = require('./routes/userRoutes')
const connectDb = require('./config/dbConnect')

dotenv.config()

connectDb()

const app = express()

const PORT = process.env.PORT || 5050


app.use(express.json())
app.use(morgan('tiny'))

app.use('/user', userRoute)


app.listen(5050, () => {
    console.log(`Port listining at ${5050}`)
})