import { request,response,Router } from "express";
import { IncidentServices } from "../dao/mongo/incidentServices.js";

const router = Router()
//agregar arquitectura de capas
const mustAdd =new IncidentServices()




router.get('/showIncident',async(req=request,res=response) => {
try {
    console.log('mostrando incidente');
    const showAll = await mustAdd.allIncidents()
    res.json(showAll)
} catch (error) {
    throw new Error(error.message);
    
}
}) 


export default router