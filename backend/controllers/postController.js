import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'


// @desc    Fetch all posts
// @route   GET/api/posts
// @access  Private
const getPost = asyncHandler(async(req, res) => {
    const post = await Post.find({})
    
    res.json(post)
})


// @desc    Fetch single post
// @route   GET/api/posts/:id
// @access  Private
const getPostById = asyncHandler(async(req, res) => {
    const post = await Post.findById(req.params.id)

    if(post){
      res.json(post)
    }else{
      res.status(404)
      throw new Error('Post not found')
    }   
})

export {getPost, getPostById}