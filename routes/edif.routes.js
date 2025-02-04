import { Router,request,response } from "express";
import { createEdif } from "../controllers/edif.js";
const router = Router()


router.post('/createEdif',createEdif)

export default router

