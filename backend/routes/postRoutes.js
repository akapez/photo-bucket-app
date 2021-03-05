import express from 'express'
import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'
const router = express.Router()


router.get('/', asyncHandler(async (req, res) => {
    const post = await Post.find({})

    res.json(post)
  }))


export default router