const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path');



const connectDb = require('./config/dbConnect')
const { authJWT } = require('./helper/jwt')

const userRoute = require('./routes/userRoutes')
const { productRoute, imageRoute } = require('./routes/productRoute');
const OrderRoute = require('./routes/orderRoute');


dotenv.config()

connectDb()

const app = express()

const PORT = process.env.PORT || 5050


app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(morgan('tiny'))
app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')))
// app.use(authJWT())

app.use('/user', userRoute)
app.use('/car', productRoute)
app.use('/order', OrderRoute)

app.use('/', imageRoute)



app.listen(5050, () => {
    console.log(`Port listining at ${5050}`)
})