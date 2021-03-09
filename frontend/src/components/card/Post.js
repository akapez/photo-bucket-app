import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import {
  Card,
  Chip,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Menu,
  MenuItem,
  IconButton,
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { deletePost } from '../../actions/postActions'
import { useStyles } from './classes'

const Post = ({ card, history }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePost(id))
    }
  }

  const createPostHandler = (post) => {
    //Post create
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          action={
            <div>
              <IconButton aria-label='settings' onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => createPostHandler(card._id)}>
                  Edit
                </MenuItem>

                <MenuItem
                  onClick={() => deleteHandler(card._id)}
                  style={{ color: '#aa2b1d' }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </div>
          }
          title={card.title}
          subheader={card.updatedAt.substring(0, 10)}
        />

        <CardActionArea>
          <CardMedia className={classes.media} image={card.selectedFile} />
        </CardActionArea>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {card.description}
          </Typography>
        </CardContent>

        <div style={{ margin: '10px' }}>
          <Chip size='small' label={card.category} />
        </div>
      </Card>
    </div>
  )
}

export default Post
