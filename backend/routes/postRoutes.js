import express from 'express'
import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'
const router = express.Router()

// @desc    Fetch all posts
// @route   GET/api/products
// @access  private
router.get('/', asyncHandler(async (req, res) => {
    const post = await Post.find({})

    res.json(post)
  }))


// @desc    Fetch single post
// @route   GET/api/product/:id
// @access  private
router.get('/:id', asyncHandler(async(req, res) => {
    const post = await Post.findById(req.params.id)

    if(post){
      res.json(post)
    }else{
      res.status(404)
      throw new Error('Post not found')
    }   
}))

export default router