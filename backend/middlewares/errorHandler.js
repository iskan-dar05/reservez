

const errorHandler = (err, req, res, next)=>{
    console.log("hhhh", err)

    const status = err.status || 500
    const message = err.message || 'Internal Server Error'

    res.status(status).json({
        message,
        ...(err.errors && { errors: err.errors })
    });
}

module.exports = errorHandler


