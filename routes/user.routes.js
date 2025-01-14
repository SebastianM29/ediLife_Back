import { request,response,Router } from "express";
import { authRegister } from "../middlewares/authRegister.js";
import { UserDTO } from "../dao/DTOs/user.dto.js";
const router = Router()

router.get('/logout',(req=request,resp=response)=> {
    try {
        console.log("esto llegaria al logout",req.session);
        if (!req.session || !req.session.user) {
            return resp.status(400).json({msg:' No hay sesion activa '})
        }
        req.session.destroy()
        resp.clearCookie('connect.sid')
       
        resp.json({
            msg:'Sesion cerrada exitosamente'
        })
    } catch (error) {
        throw new Error ( error.message )
        
    }


})
router.post('/register',authRegister('register'),(req=request,resp=response)=> {
    try {
        console.log("esto llegaria");
        const data = req.user
        resp.json({
            data
        })
    } catch (error) {
        throw new Error ( error.message )
        
    }


})

router.post('/login',authRegister('login'),(req=request,resp=response)=> {
    try {
        console.log('no llega no?');
        
        if (!req.user) {
            console.log(req.authError);
            
        }
        console.log("usuario registrado",req.user);
        const data = req.user
        const dataDto = new UserDTO(data)
        req.session.user = dataDto
        resp.json({data:dataDto})
    } catch (error) {
        throw new Error ( error.message )
        
    }


})


export default router