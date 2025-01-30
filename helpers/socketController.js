import { IncidentServices } from "../dao/mongo/incidentServices.js";
import { addIncidentPer } from "../persistence/incidentData.js";
import { addCalendarServices, deleteCalendarServices } from "../services/calendarServices.js";

const incidents =new IncidentServices()
let users= []
let allIncidents=[]
let allCalendar = []

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

    const session = socket.request.session;

    if (session) {
        console.log('Sesión activa:', session);
    } else {
        console.log('No hay sesión activa.');
    }
    const newIN = await addIncidentPer(dataIncident)
  
    allIncidents.push(newIN)
    console.log('deberia ver todos los incidentes mas el nuevo',allIncidents);
    
    io.emit('allIncidents',{allIncidents})
    
})

socket.on('showAlert',() => {
    console.log('estp deberia habiliotar una alerta');
    io.emit('changeAlert', {change:true} )
})
socket.on('changeColorIncident',() => {
    console.log('estp deberia habiliotar una alerta');
    io.emit('changeColorI', {change:true} )
})






socket.on('getCalendar',(data) => {
allCalendar = data
})
socket.on('calendar', async (data) => {
     const dataCalendar = await addCalendarServices(data)
     if (dataCalendar.error) {
        return socket.emit('calendarData',{msg:dataCalendar.msg})
     }  
        allCalendar.push(dataCalendar)
        io.emit('calendarData',{data:allCalendar})
    //    io.emit('calendarDataUser',{data:allCalendar})
})
socket.on('alertCalendar',() => {
    io.emit('alertCalendarState',{val:true})
})
socket.on('deleteEvent',async(data) => {

    console.log('este es el objeto', data);
    const del = await deleteCalendarServices(data)
    if (del.error) {
       return socket.emit('delete',{error:true,msg:del.msg})
    }
              socket.emit('delete',{error:false,msg:del.msg})
              const filterEvent = allCalendar.filter((element => element._id.toString() !== data))
              allCalendar=filterEvent
              console.log('debo verlo con uno filter',filterEvent);
              console.log('debo verlo con uno',allCalendar);
              
              io.emit('calendarData',{data:allCalendar})
    
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
