import {TOKEN_SECRET} from '../config.js'
import jwt from 'jsonwebtoken'

export function createAccessToken(payload){
    //objeto global de node
    //promesa para utilizar el async await o peticion asincronas
    return new Promise((resolve, reject)=>{
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn:"1d",
            },
            (err, token) =>{
                if(err) reject(err)
                resolve(token)
            }
        )
    })
}