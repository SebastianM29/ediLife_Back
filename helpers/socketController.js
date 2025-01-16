
let users= []

export const socketController = (socket,io) => {
console.log('cliente conectado',socket.id);
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
        return
        
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


socket.on('logout',() => {
    console.log('debe entrar a logout');
    
    users =  users.filter(element => element.socketID !== socket.id ) 

    io.emit ('online', users)
})
socket.on('disconnect',() => {
    console.log('si se va entraria aca');
    


    users =  users.filter(element => element.socketID !== socket.id ) 

   io.emit ('online', users)

})


}
