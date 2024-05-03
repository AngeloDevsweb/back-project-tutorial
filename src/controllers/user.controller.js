import { createAccessToken } from '../libs/jwt.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

export const registro = async(req, res)=>{
    const {username, email, password} = req.body;

    try {
        const usuarioEncontrado = await User.findOne({email})
        if(usuarioEncontrado)
            return res.status(400).json(["el email ya esta en uso"])

        const passwordHash = await bcrypt.hash(password, 10)

        const nuevoUsuario = new User({
            username, email, password: passwordHash
        })
        //logica es para guardar este documento en la base de datos
        const usuarioGuardado = await nuevoUsuario.save();
        //utilizamos el token
        const token = await createAccessToken({id:usuarioGuardado._id})
        //crear una cookie en el navegador o el cliente con express
        res.cookie("token", token)
        //respuesta al cliente
        res.json({
            email: usuarioGuardado.email,
            username: usuarioGuardado.username,
            id: usuarioGuardado.id
        })
    } catch (error) {
        res.status(500).json([error.message])
    }
}

export const login = async(req, res)=>{

}