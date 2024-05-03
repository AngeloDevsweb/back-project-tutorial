import {Router} from 'express'
import { login, logout, profile, registro } from '../controllers/user.controller.js';
import {authRequired} from '../middlewares/validateToken.js'

const router = Router();

//peticiones
router.post('/register', registro)
router.post('/login', login)
router.post('/logout', logout)
router.get('/perfil',authRequired ,profile)

export default router;