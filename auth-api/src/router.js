import { Router } from 'express'
import { signUp, signIn, me } from './controller/user.controller.js'
import { authenticateToken } from './middlewares/authenticate-token.middleware.js'

const router = new Router()
router.post('/auth/sign-up', signUp)
router.post('/auth/sign-in', signIn)
router.get('/me', authenticateToken, me)

export default router
