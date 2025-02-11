import app from "./src/app.js";
import {PORT} from "./src/config/env.js";
import connectDB from "./src/config/db.js";



app.listen(PORT,()=>{
    connectDB()
    console.log(`server is running on port ${PORT}`)
})