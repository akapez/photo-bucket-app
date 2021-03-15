import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {
  Button,
  Card,
  CardHeader,
  createMuiTheme,
  DialogActions,
  DialogContent,
  Grid,
  ThemeProvider,
  TextField,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { listPostDetails, updatePost } from '../actions/postActions'

import { useStyles } from '../styles/classes'
import { POST_UPDATE_RESET, POST_DETAILS_RESET} from '../constants/postConstants'

const formLabelsTheme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      asterisk: {
        color: '#db3131',
        '&$error': {
          color: '#db3131',
        },
      },
    },
  },
})

const PostEdit = ({ match, history }) => {
  const postId = match.params.id

  const classes = useStyles()

  //Data
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const postDetails = useSelector((state) => state.postDetails)
  const { loading, error, post } = postDetails

  const postUpdate = useSelector((state) => state.postUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = postUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: POST_UPDATE_RESET })
      dispatch({type: POST_DETAILS_RESET})
      history.push('/')
    } else {
      if (!post.title || post._id !== postId) {
        dispatch(listPostDetails(postId))
      } else {
        setTitle(post.title)
        setDescription(post.description)
        setImage(post.image)
        setCategory(post.category)
      }
    }
  }, [dispatch, history, postId, post, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updatePost({
        _id: postId,
        title,
        description,
        category,
        image,
      })
    )
  }

  return (
    <Grid container justify='center' className={classes.root}>
      <Grid item md={6}>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message severity='error'>{error}</Message>}
        <Card>
          <CardHeader title='Please Fill'></CardHeader>
          <ThemeProvider theme={formLabelsTheme}>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message severity='error'>{error}</Message>
            ) : (
              <form onSubmit={submitHandler}>
                <DialogContent>
                  <Grid item container spacing={1} justify='center'>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        title='Please fill out this field'
                        label='Title'
                        variant='outlined'
                        fullWidth
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        title='Please fill out this field'
                        label='Description'
                        variant='outlined'
                        fullWidth
                        required
                        multiline
                        rows='3'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        title='Please fill out this field'
                        label='Category'
                        variant='outlined'
                        fullWidth
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <input
                        className={classes.inputDisplay}
                        placeholder='Enter image url'
                        multiple
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        type='text'
                      />
                      <label htmlFor='image'>
                        <input
                          className={classes.input}
                          id='image'
                          placeholder='Enter image url'
                          multiple
                          onChange={uploadFileHandler}
                          type='file'
                        />
                        <Button
                          style={{ marginLeft: '20px' }}
                          variant='contained'
                          color='secondary'
                          component='span'
                        >
                          Upload
                        </Button>
                      </label>
                      {uploading && <Loader />}
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Link to='/' style={{ textDecoration: 'none' }}>
                    <Button variant='contained' color='primary'>
                      Cancel
                    </Button>
                  </Link>
                  <Button variant='contained' color='primary' type='Submit'>
                    Add
                  </Button>
                </DialogActions>
              </form>
            )}
          </ThemeProvider>
        </Card>        
      </Grid>
    </Grid>
  )
}

export default PostEdit
