import express from 'express'
import { getPost, getPostById, deletePostById, createPost, updatePost } from '../controllers/postController.js'
const router = express.Router()



router.route('/').get(getPost)
router.route('/:id').get(getPostById).delete(deletePostById)



export default router