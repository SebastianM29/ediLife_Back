import { Schema,model } from "mongoose";

const CalendarSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    
    start:{
        type:String,
        required:true
    },
    end:{
        type:String,
        required:true
    },


})



export default model('Calendar', CalendarSchema)