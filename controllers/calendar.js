import { request,response } from "express";
import { getCalendarServices } from "../services/calendarServices.js";

export const getAllCalendar = async(req=request,res=response) => {
    try {
        const dataCalendar = await getCalendarServices()
        if (dataCalendar.error) {
            return res.status(400).json({
                msg:"not Found"
            })
            
        }
        res.json(dataCalendar)
        
    } catch (error) {
         throw new Error("error",error.message);
         
    }

}

