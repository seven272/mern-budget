import { Router } from "express";

import { login, register, logout, getMe } from "../controllers/authController.js";

import { checkAuth } from "../middlewares/authMiddleware.js";

const router = new Router()

//register
// localhost:5000/api/auth/register
router.post('/register', register)

//login
// localhost:5000/api/auth/login
router.post('/login', login)

//logout
// localhost:5000/api/auth/logout
router.post('/logout', logout)

//get me
//localhost:5000/api/auth/me
router.get('/me', checkAuth, getMe)


export default router