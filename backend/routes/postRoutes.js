import express from 'express'
const router = express.Router()
import { getPost, getPostById, deletePostById, createPost, updatePost } from '../controllers/postController.js'
import {protect} from '../middleware/authMiddleware.js'



router.route('/').get(protect,getPost).post(protect, createPost)
router.route('/:id').get(protect, getPostById).delete(protect, deletePostById).put( protect, updatePost)



export default router