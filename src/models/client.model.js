import mongoose from 'mongoose'

const ClientSchema = new mongoose.Schema({
    nombre: {
        type: String,
    },
    descripcion:{
        type: String,
    },
    direccion:{
        type: String,
    },
    web: {
        type: String
    },
    industria:{
        type:String
    },
    estado:{
        type: String,
    },
    telefono:{
        type: String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps:true

})
export default mongoose.model('Client', ClientSchema)