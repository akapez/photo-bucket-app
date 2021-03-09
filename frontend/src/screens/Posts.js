import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/card/Post'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import Box from '@material-ui/core/Box'
import DialogBox from '../components/dialogBox/DialogBox'
import { listPosts } from '../actions/postActions'

const Posts = ({ history}) => {
  const dispatch = useDispatch()

  const postList = useSelector((state) => state.postList)
  const { loading, error, posts } = postList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postDelete = useSelector((state) => state.postDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete, } = postDelete

  useEffect(() => {
    if (userInfo) {
      dispatch(listPosts())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  return (
    <>
      <Grid container justify='flex-end'>
        <DialogBox />
      </Grid>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        <Box display='flex' flexWrap='wrap' justifyContent='center' m={8} p={1}>
          {posts.map((card, index) => (
            <Post key={index} card={card} />
          ))}
        </Box>
      )}
    </>
  )
}

export default Posts
