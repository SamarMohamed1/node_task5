const jwt = require("jsonwebtoken");//3shn a2dar ageb altoken

const logger = (req, res, next) => {
    console.log(req.method, req.url);
    next();
}

const auth = (req, res, next) => {
    try {
        const user = jwt.verify(req.header("x-auth-token"), process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "un-authorized" })
    }
}

const catchAsyncErrors = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { logger, auth, catchAsyncErrors }