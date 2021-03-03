import React from 'react'
import {
  Card,
  Chip,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import { useStyles } from './classes'

const Post = ({ card }) => {
  const classes = useStyles()

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }          
          title={card.title}
          subheader='September 14, 2016'
        />

        <CardActionArea>
          <CardMedia className={classes.media} image={card.selectedFile} />
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              {card.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <div style={{ margin: '10px' }}>
          <Chip size='small' label={card.category} />
        </div>
      </Card>
    </div>
  )
}

export default Post
