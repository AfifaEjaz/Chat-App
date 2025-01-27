import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
const router = express.Router()
import { signup, login, getUsers } from './controller.js'

router.post("/signup", signup)
router.post("/login", login)
router.get("/allusers", authMiddleware, getUsers)
// router.post("/logout", logout)

export default router