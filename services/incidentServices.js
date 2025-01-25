import { addIncidentPer } from "../persistence/incidentData"



export const addIncidentServices = async(data) => {
  return await addIncidentPer(data)
}