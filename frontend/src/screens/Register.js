import React, { useEffect } from 'react'
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  Typography,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { register } from '../actions/userActions'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'formik-material-ui'

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginTop: '5rem',
  },
  button: {
    margin: theme.spacing(1),
  },
  typography: {
    fontSize: '15px',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#025955',
    color: '#fff',
  },
  link: {
    textDecoration: 'none',
    color: '#1e212d',
    fontWeight: 'bold',
  },
}))

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
  name: '',
  email: '',
  password: '',
}

//password validation
const lowercaseRegEx = /(?=.*[a-z])/
const uppercaseRegEx = /(?=.*[A-Z])/
const numericRegEx = /(?=.*[0-9])/
const lengthRegEx = /(?=.{6,})/

//validation schema
let validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .matches(
      lowercaseRegEx,
      'Must contain one lowercase alphabetical character!'
    )
    .matches(
      uppercaseRegEx,
      'Must contain one uppercase alphabetical character!'
    )
    .matches(numericRegEx, 'Must contain one numeric character!')
    .matches(lengthRegEx, 'Must contain 6 characters!')
    .required('Required!'),
})

const Register = ({ location, history }) => {
  const classes = useStyle()

  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)

  const { loading, error, userInfo } = userRegister
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = ({ name, email, password }) => {
    dispatch(register(name, email, password))
  }

  return (
    <Grid container justify='center' className={classes.root}>
      <Grid item md={4}>
        <Card>
          <CardHeader title='SIGN UP'></CardHeader>
          {error && <Message severity='error'>{error}</Message>}
          {loading && <Loader />}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
          >
            {({ dirty, isValid, values }) => {
              return (
                <ThemeProvider theme={formLabelsTheme}>
                  <Form>
                    <CardContent>
                      <Grid item container spacing={1} justify='center'>
                        <Grid item xs={12} sm={12} md={12}>
                          <Field
                            title='Please fill out this field'
                            label='Name'
                            variant='outlined'
                            fullWidth
                            name='name'
                            required
                            value={values.name}
                            component={TextField}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <Field
                            title='Please fill out this field'
                            label='Email Address'
                            variant='outlined'
                            fullWidth
                            name='email'
                            required
                            value={values.email}
                            component={TextField}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <Field
                            title='Must contain at least one numeric 
                            and one uppercase and lowercase letter, and at 
                            least 6 or more characters'
                            label='Password'
                            variant='outlined'
                            fullWidth
                            name='password'
                            required
                            value={values.password}
                            type='password'
                            component={TextField}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button
                        disabled={!dirty || !isValid}
                        variant='contained'
                        color='primary'
                        type='Submit'
                        className={classes.button}
                      >
                        Register
                      </Button>
                    </CardActions>
                  </Form>
                </ThemeProvider>
              )
            }}
          </Formik>
          <Typography className={classes.typography}>
            Have an Account?{' '}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              className={classes.link}
            >
              Login
            </Link>
          </Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Register
