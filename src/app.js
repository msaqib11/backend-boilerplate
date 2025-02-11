import express from 'express';
import routes from "./routes/index.js"
import { handleError } from "./middlewares/errorHandler.middleware.js"
const app = express()


app.use(express.json())
app.use("/api/v1",routes)
app.use(handleError)


export default app;


