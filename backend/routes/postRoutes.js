import express from 'express'
const router = express.Router()
import { getPost, getPostById, deletePostById, createPost, updatePost } from '../controllers/postController.js'
import {protect} from '../middleware/authMiddleware.js'



router.route('/').get(getPost)
router.route('/:id').get(protect, getPostById).delete(protect, deletePostById)



export default router