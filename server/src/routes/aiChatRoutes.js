import express from 'express'
import { chat } from '../controllers/aiChatController.js'

const router = express.Router()
router.post('/', chat)

export default router