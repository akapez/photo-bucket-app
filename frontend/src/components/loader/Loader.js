import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useStyles } from './classes'

const Loader = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress />      
    </div>
  )
}

export default Loader
