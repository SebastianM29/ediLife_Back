import { createEdifPer } from "../persistence/edifData.js"


export const creatEdifSer = async (obj) => {
  return await createEdifPer(obj)
}
