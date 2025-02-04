import  {EdifServices}  from "../dao/mongo/edfifServices.js";
const Edif =  new EdifServices()

export const createEdifPer = async (obj) => {
    return await Edif.createEfid(obj)
}