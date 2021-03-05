import React, { useState, useEffect } from 'react'
import Post from '../components/card/Post'
import Box from '@material-ui/core/Box'
import axios from 'axios'

const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get('/api/posts')

      setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <Box display='flex' flexWrap='wrap' justifyContent='center' m={8} p={1}>
      {posts.map((card, index) => (
        <Post key={index} card={card} />
      ))}
    </Box>
  )
}

export default Posts
