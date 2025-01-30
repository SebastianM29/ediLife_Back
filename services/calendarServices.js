import { addCalendarPer, deleteCalendarPer, getCalendarPer } from "../persistence/calendarData.js"


export const addCalendarServices = async (data) => {
    return await addCalendarPer(data)
}

export const getCalendarServices = async () => {
    return await getCalendarPer()
}
export const deleteCalendarServices = async (id) => {
    return await deleteCalendarPer(id)
}