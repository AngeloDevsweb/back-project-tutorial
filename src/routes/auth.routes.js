import {Router} from 'express'
import { login, logout, profile, registro } from '../controllers/user.controller.js';
import {authRequired} from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validatorMiddleware.js'
import { loginSchema, registerSchema } from '../schemas/user.schema.js';

const router = Router();

//peticiones
router.post('/register', validateSchema(registerSchema), registro)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/perfil',authRequired ,profile)

export default router;