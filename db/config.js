import mongoose from "mongoose";


export const connectDb = async() => {
try {
    await mongoose.connect('mongodb+srv://zevaz:ac5m1jrJNBQIR4aU@cluster0.ksj8g.mongodb.net/');
    console.log('conectado a la base de datos');
    
} catch (error) {
    throw new Error (`Error al conectar en la base de datos ${error.message}`)
}
}
