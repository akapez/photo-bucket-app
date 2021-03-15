import React, { useEffect } from 'react'
import { Button, Grid } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/card/Post'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import Box from '@material-ui/core/Box'
import { listPosts, createPost} from '../actions/postActions'
import { POST_CREATE_RESET } from '../constants/postConstants'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(10),
    padding: '20px',
  },

  button: {
    fontWeight: 'bold',
  },
}))

const Posts = ({ history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const postList = useSelector((state) => state.postList)
  const { loading, error, posts } = postList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postDelete = useSelector((state) => state.postDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = postDelete

  const postCreate = useSelector((state) => state.postCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    post: createdPost,
  } = postCreate

  useEffect(() => {
    dispatch({ type: POST_CREATE_RESET })
    if (userInfo) {
      dispatch(listPosts())
    } else {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/post/${createdPost._id}/edit`)
    } 

  }, [dispatch, history, userInfo, successDelete, successCreate, createdPost])

  const createPostHandler = () => {
    dispatch(createPost())
  }

  return (
    <>
      <Grid container justify='flex-end' className={classes.root}>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          startIcon={<AddCircleOutlineIcon />}
          onClick={createPostHandler}
        >
          Add a Photo
        </Button>
      </Grid>
      {loadingDelete && <Loader />}
      {errorDelete && <Message severity='error'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message severity='error'>{errorCreate}</Message>}
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
