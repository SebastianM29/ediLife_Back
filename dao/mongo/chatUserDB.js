


export class chatUser {
    constructor(){
        this.users = []
        
    }

    addUser(user){
       
        const objCreated = {
            name: user.user,
            socketID: user.socketId,
            userId : user.id
        }
       
        this.users.push(objCreated)

        return this.users
    }
    
    getAllUsers() {
        return this.users
    }
     
    deleteUser(id){
      this.users = this.users.filter(element => {
            element.userId !== id
        })
      return this.users
    }

}