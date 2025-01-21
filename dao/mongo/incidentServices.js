import  Incident  from "../mongo/models/incidentModels.js";

export class incidentServices {
    constructor() {
       this.option = {
        weekday: 'long',
        year:'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'

       }
    }

    async addIncident({title,notify}) {
    
    const format = Intl.DateTimeFormat('es-AR',this.option)
    const actual = new Date()
    const actualDate = format.format(actual)
    
    if (![title,notify].every(Boolean)) {
        return ({
            error:true,
            msg:'datos incompletos'
        })
    }

    const obj = {
            title,
            incident:notify,
            date:actualDate,
            repair:false
        }
    const created = await Incident.create(obj)
      return ({
        error:false,
        created
    })
    }
    
    async allIncidents() {
        const allIncidents = await Incident.find()
        return({
            error:false,
            allIncidents
        })
    }





}