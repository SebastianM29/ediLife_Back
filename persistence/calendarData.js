import { CalendarServices } from "../dao/mongo/calendarServices.js";


const calendar = new CalendarServices()

export const addCalendarPer = async(data) => {
    return await calendar.addCalendar(data)
}

export const getCalendarPer = () => {
    return calendar.getAllCalendar()
}
export const deleteCalendarPer = (id) => {
    return calendar.deleteEventCalendar(id)
}