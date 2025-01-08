import express from "express";
import * as http from "http";
import {Server as SocketIoServer} from "socket.io";
import cors from "cors";
import { socketController } from "../helpers/socketController.js";
import { connectDb } from "../db/config.js";



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
        this.middlewares()
        this.routes()
        this.sockets()
        this.connectionDB()


    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(cors())
    }

    routes(){
        this.app.get("/", (req, res) => {
            res.send("Servidor funcionando correctamente!");
        });

    }

    sockets() {
        this.io.on('connection',(socket) =>{
      
            
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