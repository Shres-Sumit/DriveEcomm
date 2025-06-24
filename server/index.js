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
const cartRoute = require('./routes/cartRoute');

const verifyRoute = require('./routes/verificationRoute');
const testDriveRoute = require('./routes/testDriveRoute');
const { purchaseRouter } = require('./routes/purchaseRoue');
const { PaymentRouter } = require('./routes/paymentRoute');



dotenv.config()

connectDb()

const app = express()

const PORT = process.env.PORT || 5050

app.use(express.json());

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
app.use('/shop', cartRoute)
app.use('/testDrive', testDriveRoute)
app.use('/purchase', purchaseRouter)
app.use('/payment', PaymentRouter)

app.use('/', imageRoute)
app.use('/', verifyRoute)


app.listen(5050, () => {
    console.log(`Port listining at ${5050}`)
})