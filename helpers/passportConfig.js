import passport from "passport";
import local from "passport-local";

import Users from "../dao/mongo/models/userModels.js";

const localStrategy = local.Strategy



export const passportInitialize = () => {
    passport.use('register', new localStrategy({
        passReqToCallback:true,
        usernameField:'email',
        passwordField:'pass'
    },async(req,username,password,done)=>{
        try {
            const {name,age} = req.body

          let role = req.body.role 
           
           const findUser = await Users.findOne({ email: username })
           if (findUser) {
            console.log('aca entra si encuentra un mail ighual enb la base de datos');
            
            return done(null,false,{msg:'error al crear'})
           }
           if (username === "zevaz@hotmail.com") {
            role ='admin'
            
           }
           const obj = {
            name,
            email:username,
            role,
            age,
            pass:password
           }
          const created = await  Users.create(obj)
          return done(null,created)
          
        } catch (error) {
            return done(error)
        }
     
    }))


    passport.use('login', new localStrategy({
        passReqToCallback:true,
        usernameField:'email',
        passwordField:'pass'
    },async(req,username,password,done)=>{
        try {

           console.log('ver si llega al login de la estrategia');
           
           const findUser = await Users.findOne({ email: username })
           if (findUser.pass === password) {
            console.log('aca entra si encuentra un mail ighual enb la base de datos');
            
            return done(null,findUser)
           }
           return done(null,false,{msg:'Usuario no registrado'})
    
         
       
          
        } catch (error) {
            return done(error)
        }
     
    }))

    passport.serializeUser((user,done)=>{
        done(null,user.id)
        
    })

    passport.deserializeUser(async(id,done) => {
        let user = await Users.findById(id)
        done(null,user)
    })
    

}
