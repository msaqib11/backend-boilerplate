import { Router } from "express";
import {verifyTokenAdmin} from "../middlewares/verifyToken.middleware.js";


const router = Router();

router.put("/:id",verifyTokenAdmin, (req,res)=>{
  res.send("Hello World");
})

export default router;