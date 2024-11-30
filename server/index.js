const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')



const connectDb = require('./config/dbConnect')
const { authJWT } = require('./helper/jwt')

const userRoute = require('./routes/userRoutes')
const productRoute = require('./routes/productRoute')


dotenv.config()

connectDb()

const app = express()

const PORT = process.env.PORT || 5050


app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(morgan('tiny'))
app.use(authJWT())

app.use('/user', userRoute)
app.use('/car', productRoute)


app.listen(5050, () => {
    console.log(`Port listining at ${5050}`)
})