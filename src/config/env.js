import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT || 8800;
export const MONGODB_URI = process.env.MONGODB_URI
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
export const NODE_ENV = process.env.NODE_ENV || "development";