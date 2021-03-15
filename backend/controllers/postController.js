import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.find({ user: req.user._id })

  res.json(post)
})

const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post) {
    res.json(post)
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

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

const createPost = asyncHandler(async (req, res) => {
  const post = new Post({
    title: 'Sample Title',
    description: 'Sample Description',
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'sample category',
  })

  const createdPost = await post.save()
  res.status(201).json(createdPost)
})

const updatePost = asyncHandler(async (req, res) => {
  const { title, description, image, category } = req.body

  const post = await Post.findById(req.params.id)

  if (post) {
    post.title = title
    post.description = description
    post.image = image
    post.category = category

    const updatedPost = await post.save()
    res.json(updatedPost)
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

export { getPost, getPostById, deletePostById, createPost, updatePost }
