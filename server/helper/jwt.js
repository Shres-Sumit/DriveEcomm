// const { expressjwt: expressJwt } = require('express-jwt')

const JWT = require("jsonwebtoken")
const { userInfo } = require("../models/userModel")

// function authJWT() {
//     const secret = process.env.Secret

//     return expressJwt({
//         secret,
//         algorithms: ['HS256'],
//     }).unless({
//         path: [
//             { url: /\/check-file(.*)/, method: ['GET', 'OPTIONS'] },
//             { url: /\/public(.*)/, method: ['GET', 'OPTIONS'] },
//             { url: /\/car(.*)/, method: ['GET', 'OPTIONS'] },



//             { url: /\/user\/login/, method: ['POST', 'OPTIONS'] },
//             { url: /\/user\/signup/, method: ['POST', 'OPTIONS'] }

//         ]
//     })
// }


const requireSign = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.Secret)
        // console.log(decode)
        req.userId = decode.userId
        console.log(req.userId)
        next()
    } catch (error) {
        console.log(error);

    }
}


const isAdmin = async (req, res, next) => {


    try {
        const userOne = await userInfo.findById(req.userId)
        if (!userOne) {
            return res.status(400).send({
                success: false,
                message: "user not found"
            })
        }

        if (userOne.role !== 1) {
            return res.status(400).send({
                success: false,
                message: "unAutorized Access"
            })
        }
        else {
            next()
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { requireSign, isAdmin }
// module.exports = { authJWT }