import express from 'express'
import { getPost, getPostById } from '../controllers/postController.js'
const router = express.Router()



router.route('/').get(getPost)
router.route('/:id').get(getPostById)



export default router