import mongoose from 'mongoose';
import { MONGODB_URI } from './env.js';

const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(MONGODB_URI)
        if(connect){
            console.log(`connected to mongodb`,connect.connection.host)
        }
    } catch (error) {
        console.log("mongodb connection error",error)
        throw error
    }
}

export default connectDB;