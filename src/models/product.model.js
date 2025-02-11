import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,

    },
    color: {
        type: String,

    },
    images: {
        type : [String],
        required: true
    },
    category: {
        type: Array,
    }
}, { timestamps: true })
export default mongoose.model("Product", productSchema)