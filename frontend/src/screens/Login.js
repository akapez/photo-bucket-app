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
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { login } from '../actions/userActions'

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

//Data
const initialValues = {
  email: '',
  password: '',
}

//password validation
// const lowercaseRegEx = /(?=.*[a-z])/
// const uppercaseRegEx = /(?=.*[A-Z])/
// const numericRegEx = /(?=.*[0-9])/
// const lengthRegEx = /(?=.{6,})/

//validation schema
let validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  // password: Yup.string()
  //   .matches(
  //     lowercaseRegEx,
  //     'Must contain one lowercase alphabetical character!'
  //   )
  //   .matches(
  //     uppercaseRegEx,
  //     'Must contain one uppercase alphabetical character!'
  //   )
  //   .matches(numericRegEx, 'Must contain one numeric character!')
  //   .matches(lengthRegEx, 'Must contain 6 characters!')
  //   .required('Required!'),
})

const Login = ({ location, history }) => {
  const classes = useStyle()

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = ({ email, password }) => {
    dispatch(login(email, password))
  }

  return (
    <Grid container justify='center' className={classes.root}>
      <Grid item md={4}>
        <Card>
          <CardHeader title='SIGN IN'></CardHeader>
          {error && <Message severity='error'>{error}</Message>}
          {loading && <Loader />}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
          >
            {({ dirty, isValid, values }) => {
              return (
                <Form>
                  <CardContent>
                    <Grid item container spacing={1} justify='center'>
                      <Grid item xs={12} sm={6} md={12}>
                        <Field
                          label='Email Address'
                          variant='outlined'
                          fullWidth
                          name='email'
                          value={values.email}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={12}>
                        <Field
                          label='Password'
                          variant='outlined'
                          fullWidth
                          name='password'
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
                      SIGN IN
                    </Button>
                  </CardActions>
                </Form>
              )
            }}
          </Formik>
          <Typography className={classes.typography}>
            New User?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
              className={classes.link}
            >
              Register
            </Link>
          </Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Login
