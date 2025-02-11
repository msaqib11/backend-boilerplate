import mongoose,{ Schema } from "mongoose";

const cartSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
}, { timestamps: true })
export default mongoose.model("Cart", cartSchema)