const mongoose = require('mongoose')

const connectDb = async () => {
    const conn = await mongoose.connect(process.env.DB_API)
    console.log(`database is connected on ${conn.connection.host}`)
}

module.exports = connectDb