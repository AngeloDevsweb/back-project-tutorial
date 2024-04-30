import mongoose from 'mongoose'

export const connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost/backproject")
        console.log("la base de datos esta conectada");
    } catch (error) {
        console.log(error);
    }
}