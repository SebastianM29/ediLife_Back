import Calendar from "../mongo/models/calendarModels.js";

export class CalendarServices {
    constructor(){

    }

    async addCalendar({title,start,end}) {
        if (![title,start,end].every(Boolean)) {
            return ({
                error:true,
                msg:'datos incompletos, completelos para el calendario'
            })
        }

        const data = await Calendar.create({title,start,end})
        return data
    }

    async getAllCalendar() {
        const data = await Calendar.find()
        return data
        
    }

    async deleteEventCalendar (id) {
      const findThis = await  Calendar.findById(id)
      if (!findThis) {
       return ({ error:true,msg:"No existe ese ID"})
      }
      const deleteThis = await Calendar.findByIdAndDelete(id)
      return deleteThis

    }
}