import { IncidentServices } from "../dao/mongo/incidentServices.js"

const incidents = new IncidentServices()


export const addIncidentPer = async(data) => {
    return await incidents.addIncident(data)

}