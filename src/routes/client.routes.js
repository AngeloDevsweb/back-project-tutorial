import {Router} from 'express'
import {authRequired} from '../middlewares/validateToken.js'
import { createClient, deleteClient, getClient, getClientOne, updteClient } from '../controllers/client.controller.js'


const router = Router()

//definir rutas
router.get('/api/client', authRequired, getClient);
router.post('/api/client', authRequired, createClient);

//definir rutas con id
router.get('/api/client/:id', authRequired, getClientOne)
router.delete('/api/client/:id', authRequired, deleteClient)
router.put('/api/client/:id', authRequired, updteClient)

export default router;
