const errorHandler = (err, req, res, next) => {
    
    // Sets status code to 500 if server fails
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack     // Stack is not set in production
    })
}

module.exports = { errorHandler }