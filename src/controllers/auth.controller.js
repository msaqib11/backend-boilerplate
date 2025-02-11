import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';
import { errorTypes } from '../middlewares/errorHandler.middleware.js';
import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
var salt = bcrypt.genSaltSync(10);
export const register = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
           return next(errorTypes.notFound("User not found"));
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return next(errorTypes.badRequest("Invalid Credentials"));
        }

        const {password,...otherInfo} = user._doc
        const accessToken = jwt.sign({userId:user._id,isAdmin:user.isAdmin},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});

        res.status(200).json({...otherInfo,accessToken});
    } catch (error) {
        res.status(500).json({ message: "Error logging in user" });
    }
}