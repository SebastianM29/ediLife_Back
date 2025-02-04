import { request,response } from "express";
import { creatEdifSer } from "../services/edifServices.js";

export const createEdif = async(req=request , res = response) => {
    const obj = req.body
    const resp = await creatEdifSer(obj)
    if (resp.error) {
     return  res.status(400).json({
            msg:resp.msg
        })
    }

    return res.json({
       data : resp.result
    })


}