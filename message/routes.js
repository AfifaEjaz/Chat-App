import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
const router = express.Router()
import { getMessage, sendMessage } from './controller.js'

router.get("/:id", authMiddleware, getMessage)
router.post("/send/:id", authMiddleware, sendMessage)

export default router