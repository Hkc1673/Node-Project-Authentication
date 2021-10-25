const errorHandling = (err, req, res, next) => {
    res.status(err.statusCode).json(err)
}

module.exports = errorHandling;