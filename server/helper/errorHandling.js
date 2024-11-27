function errorHandler(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        return res.status(401).json({
            success: false,
            message: "user is not authorized"
        })
    }

    // Validation Error 
    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: err.message || "Validation Error"
        })
    }

    // Generic Server Error
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
}

module.exports = { errorHandler }