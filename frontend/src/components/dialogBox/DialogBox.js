import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(5),
    marginTop: theme.spacing(10),
    fontWeight: 'bold',
  },
}))

const DialogBox = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        variant='contained'
        color='secondary'
        className={classes.button}
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleClickOpen}
      >
        Add a Photo
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add your best memories</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='secondary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogBox
