import express from "express";
import * as http from "http";
import {Server as SocketIoServer} from "socket.io";
import cors from "cors";

import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";


import { socketController } from "../helpers/socketController.js";
import { connectDb } from "../db/config.js";

import  sessionRoutes  from "../routes/user.routes.js";
import  incidentRoutes  from "../routes/incident.routes.js";
import { passportInitialize } from "../helpers/passportConfig.js";



export class Server {
    constructor() {
    
        //build server
        this.app = express()
        this.httpServer = http.createServer(this.app)
        //client connect
        this.io = new SocketIoServer(this.httpServer,{
            cors:
            {
                origin:"http://localhost:5173",
                methods:["GET","POST"]
            }
        })
        this.configSession = {
            store:MongoStore.create({
            mongoUrl:"mongodb+srv://zevaz:ac5m1jrJNBQIR4aU@cluster0.ksj8g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            ttl:100000
        }),
        secret:"123456",
        resave:false,
        saveUninitialized:false,

        cookie:{
            maxAge: 24 *60 *60 * 1000,
            secure: false,
            httpOnly:true
        }}
        this.middlewares()
        this.routes()
        passportInitialize()
        this.configureSockets()
        this.sockets()
        this.connectionDB()


    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(cors({
            origin:"http://localhost:5173",
            credentials:true
        }))
        this.app.use(session(this.configSession))
    }

    routes(){
        this.app.use("/", sessionRoutes);
        this.app.use("/", incidentRoutes);

    }
    configureSockets(){
        const wrap = (middleware) => (socket,next) => middleware(socket.request,{},next)
        this.io.use(wrap(session(this.configSession))) 
    }

    sockets() {
        this.io.on('connection',(socket) =>{
           console.log('conectado el cliente');
           
            
          socketController(socket,this.io)
        })
    }

    async connectionDB () {
        await connectDb()
    }


    listen(){
        this.httpServer.listen(3000, () => {
            console.log('conectado');
            
        })
    }

}