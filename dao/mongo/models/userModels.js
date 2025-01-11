import {Schema,model} from "mongoose";

const UserSchema =new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    age:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
})


export default model ( 'Users', UserSchema)