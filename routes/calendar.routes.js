import { request,response,Router } from "express";
import { getCalendarServices } from "../services/calendarServices.js";
import { getAllCalendar } from "../controllers/calendar.js";

const router = Router()



router.get('/allCalendar',getAllCalendar)


export default router