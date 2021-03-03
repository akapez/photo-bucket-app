import React from 'react'
import Post from '../components/card/Post'
import gallery from '../gallery'
import Box from '@material-ui/core/Box';

const Posts = () => {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" m={8} p={1}>
      {gallery.map((card ,index) => (
        <Post key={index} card={card} />
      ))}
    </Box>
  )
}

export default Posts
