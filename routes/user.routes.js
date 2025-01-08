import { request,response,Router } from "express";
const router = Router()

router.post('/register',(req=request,resp=response)=> {
console.log("esto llegaria",req.body);


})