import mongoose, { Schema, model } from "mongoose";

const EdifSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    numberOfFloors:{
        type:Number,
        required:true
    },
    numberApartmentsFloor:{
        type:Number,
        required:true
    },
    numberOfElevator:{
        type:Number,
        required:true
    },
    numberOfStaircases:{
        type:Number,
        required:true
    },
    totalArea:{
        type:Number,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    apartments:[
        {
            apartmentNumber:{
                type:Number,
               
            },
            userId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Users',
                default:null
            }
            

        }
    ]
       
})

EdifSchema.pre('save', function (next) {
    if (!this.apartments.length) {
        const totalApartments = this.numberOfFloors * this.numberApartmentsFloor
        this.apartments = Array.from({length:totalApartments}, (_,i) => {
            const numberFloor = Math.floor(i / this.numberApartmentsFloor) + 1
            const numberApartment = (numberFloor * 100) + (i % this.numberApartmentsFloor)
            return {
                apartmentNumber: numberApartment,

            }
        })

        
    }
    next()

})

export default model('Edif',EdifSchema)