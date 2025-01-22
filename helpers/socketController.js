import { IncidentServices } from "../dao/mongo/incidentServices.js";

const incidents =new IncidentServices()
let users= []
let allIncidents=[]

export const socketController = async(socket,io) => {
console.log('cliente conectado',socket.id);

socket.on('sendAllData',(data => {
    console.log('todos los inncidentes',data);
    allIncidents = data.data
    console.log('el valor de allIncidents',allIncidents);
    

    
}))

socket.on('log',(user) => {
console.log('usuario conectado', user);

})


socket.on('userConnected', (user) => {
    console.log('viendo los uduarioss' , user);
    const objCreated = {
        name: user.user,
        socketID: user.socketId,
        userId : user.id
    }
     if (users.length === 0) {
        users.push(objCreated)
     }
     const find = users.find((element) => element.userId === objCreated.userId )
     if (!find) {
        console.log('se puede grabar');
        users.push(objCreated)
    }else{
        console.log('no se puede grabar el usuario');
  
    }
    io.emit ('online',users)
}) 

socket.on('msg', (data) => {
console.log('que me manda',data);

io.emit('mgs',{
    user:data.actualUser.name,
    id:data.actualUser.id,
    msg:data.msg})

})

socket.on('newIncident',async(dataIncident) => {

    console.log('aca esta el que debo agregar',dataIncident);
    const newIN = await incidents.addIncident(dataIncident)
    console.log('esto deberia traer un valor',newIN);
    console.log('esto deberia traer un valor en nuevo incidente',allIncidents);
    
    allIncidents.push(newIN)
    console.log('deberia ver todos los incidentes mas el nuevo',allIncidents);
    
    io.emit('allIncidents',{allIncidents})
    
})


socket.on('logout',(socketId) => {
    console.log('debe entrar a logout',socketId);
    
    users =  users.filter(element => 
        {   console.log('pasando y chequeando element.socketId',element.socketID);
           console.log('pasando y chequeando el socket que me envia',socketId);
        
            return element.socketID !== socketId.socket }) 
    console.log('usuarios filtrados ?', users);

    io.emit ('online', users)
    
    io.emit('logoutConfirmed')
})


socket.on('disconnect',() => {
    console.log('si se va entraria aca');
    


    users =  users.filter(element => element.socketID !== socket.id ) 

   io.emit ('online', users)
   socket.emit('logoutConfirmed');

})


}
