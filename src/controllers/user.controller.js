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
    const {email, password} = req.body;

    try {
         //guardamos en la variable el usuario o email que encontramos en la base de datos
         const userFound = await User.findOne({email})
         //hacemos una validacion 
         if(!userFound) return res.status(400).json(["usuario no encontrado"])

         //logica para verificar el password del usuario con el password de la base de datos del email que encontramos
         const isMatch = await bcrypt.compare(password, userFound.password)
         //hacemos una validacion
         if(!isMatch) return res.status(400).json(["Contraseña incorrecta"])

         //utilizar el token
         const token = await createAccessToken({id: userFound._id}) //enviamos el id para que lo cree como un token
         //crea una cookie que ya viene de express, para que se cree directamente la cookie en nuestro navegador
         res.cookie("token", token)

         //respuesta al cliente
         res.json({
            email:userFound.email,
            username: userFound.username,
            id: userFound.id,
            createdAt : userFound.createdAt
         })
 

    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const logout = (req, res) =>{
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200)
}

export const profile = async(req, res)=>{
    const usuarioEncontrado = await User.findById(req.user.id)

    if (!usuarioEncontrado) return res.status(400).json(["usuario no encontrado"]);

    return res.json({
        id: usuarioEncontrado._id,
        username: usuarioEncontrado.username,
        email: usuarioEncontrado.email,
    })
}


