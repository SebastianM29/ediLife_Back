import { request,response,Router } from "express";
import { IncidentServices } from "../dao/mongo/incidentServices.js";
const router = Router()
//agregar arquitectura de capas
const mustAdd =new IncidentServices()


router.post('/addIncident',async(req=request,res=response) => {
try {
    console.log('Agregando incidente ');

    const info = await mustAdd.addIncident(req.body)
    if (info.error) {
        return res.status(400).json({
         msg : info.msg
        })
    }
    res.json(info)
} catch (error) {
    throw new Error(error.message);
}}
)

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