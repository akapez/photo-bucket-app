import React, { useState } from 'react'
import {
  Button,
  createMuiTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  ThemeProvider,
} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'
import { useStyles } from './classes'

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

//Data
const initialValues = {
  title: '',
  description: '',
  selectedFile: '',
  category: '',
}

//validation schema
let validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
})

const DialogBox = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const submitHandler = () => {
    console.log('hello')
  }

  return (
    <>
      <div className={classes.root}>
        <Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper} variant='outlined'>
              <Button
                variant='contained'
                color='secondary'
                className={classes.button}
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleClickOpen}
              >
                Add a Photo
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add your best memory</DialogTitle>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ dirty, isValid, values }) => {
            return (
              <ThemeProvider theme={formLabelsTheme}>
                <Form>
                  <DialogContent>
                    <Grid item container spacing={1} justify='center'>
                      <Grid item xs={12} sm={12} md={12}>
                        <Field
                          title='Please fill out this field'
                          label='Title'
                          variant='outlined'
                          fullWidth
                          name='title'
                          required
                          value={values.title}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <Field
                          title='Please fill out this field'
                          label='Description'
                          variant='outlined'
                          fullWidth
                          multiline
                          rows='3'
                          name='description'
                          value={values.description}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <Field
                          title='Please fill out this field'
                          label='Category'
                          variant='outlined'
                          fullWidth
                          name='category'
                          value={values.category}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <input
                          accept='image/*'
                          className={classes.input}
                          id='contained-button-file'
                          multiple
                          type='file'
                        />
                        <label htmlFor='contained-button-file'>
                          <Button
                            variant='contained'
                            color='primary'
                            component='span'
                          >
                            Upload
                          </Button>
                        </label>
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleClose}
                      variant='contained'
                      color='secondary'
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={!dirty || !isValid}
                      variant='contained'
                      color='primary'
                      type='Submit'
                    >
                      Add
                    </Button>
                  </DialogActions>
                </Form>
              </ThemeProvider>
            )
          }}
        </Formik>
      </Dialog>
    </>
  )
}

export default DialogBox
