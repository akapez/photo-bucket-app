import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'


// @desc    Fetch all user specific posts
// @route   GET/api/posts
// @access  Private
const getPost = asyncHandler(async(req, res) => {
    const post = await Post.find({user: req.user._id})
    
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


//@desc     Delete a post
//@route    DELETE/api/post/:id
//@access   Private
const deletePostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post) {
    await post.remove()
    res.json({ message: 'Post removed' })
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

//@desc     Create a new post
//@route    POST/api/posts
//@access   Private
const createPost = asyncHandler(async (req, res) => {
  const post = new Post({
    title,
    description,    
    user: req.user._id,
    selectedFile,    
    category,  
    
  })

  const createdPost = await post.save()
  res.status(201).json(createdPost)
})

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const {
    title,
    description, 
    selectedFile,    
    category,  
  } = req.body

  const post = await Post.findById(req.params.id)

  if (post) {
    post.title = title
    post.description = description
    post.selectedFile = selectedFile
    post.category = category    

    const updatedPost= await post.save()
    res.json(updatedPost)
  } else {
    res.status(404)
    throw new Error("Post not found")
  }
})


export {getPost, getPostById, deletePostById, createPost, updatePost}