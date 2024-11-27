const { expressjwt: expressJwt } = require('express-jwt')

function authJWT() {
    const secret = process.env.Secret

    return expressJwt({
        secret,
        algorithms: ['HS256'],
    }).unless({
        path: [
            { url: /\/check-file(.*)/, method: ['GET', 'OPTIONS'] },
            { url: /\/public(.*)/, method: ['GET', 'OPTIONS'] },


            { url: /\/user\/login/, method: ['POST', 'OPTIONS'] },
            { url: /\/user\/signup/, method: ['POST', 'OPTIONS'] }

        ]
    })
}

module.exports = { authJWT }