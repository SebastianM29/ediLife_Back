import { Schema,model } from "mongoose";

const IncidentSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    
    incident:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    repair:{
        type:Boolean,
        required:true
    }

})



export default model('Incidents', IncidentSchema)