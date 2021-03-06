import React from 'react'
import Alert from '@material-ui/lab/Alert'
import { useStyles } from './classes'

const Message = ({severity, children}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Alert severity={severity}>
        {children}
      </Alert>
    </div>
  )
}

Message.defaultProps = {
    severity: 'info'
}

export default Message
