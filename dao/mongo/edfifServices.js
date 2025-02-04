import  Edif  from "../mongo/models/edifModels.js";


export class EdifServices {
    constructor() {

    }

    async createEfid (obj) {
        console.log(obj);
        
        if (![obj.name,
            obj.address,
            obj.numberOfFloors,
            obj.numberApartmentsFloor,
            obj.numberOfElevator,
            obj.numberOfStaircases,
            obj.totalArea,
            obj.year
            
            ].every(Boolean)) {
            return ({
                error:true,
                msg:"Faltan datos al crear el edificio"
            })
        }
        const result = await Edif.create(obj)
        return {
            error:false,
            result
        }
    }
}