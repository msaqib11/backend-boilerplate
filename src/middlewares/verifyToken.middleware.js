import { JWT_SECRET } from "../config/env.js"
import { createError, errorTypes } from "./errorHandler.middleware.js"
import jwt from "jsonwebtoken"
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next(errorTypes.unauthorized("No token provided"))

    const token = authHeader.split(" ")[1]; // Extract the token (Bearer scheme)
    if (!token) {
        return next(errorTypes.unauthorized("Invalid token format"));
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return next(createError(errorTypes.badRequest("Invalid token")))
        req.user = decoded
        next()
    })
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if(!req.user) {
            return next(errorTypes.unauthorized("User not authenticated"))
        }
        if (req.user.userId === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(createError(errorTypes.unauthorized("Unauthorized")))
        }
    })
}

const verifyTokenAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) {
            return next(err);
          }
        if (req.user.isAdmin) {
            next()
        } else {
            return next(errorTypes.unauthorized("Unauthorized"))
        }
    })
}

export { verifyToken, verifyTokenAndAuthorization,verifyTokenAdmin }