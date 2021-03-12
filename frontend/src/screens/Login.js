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
import { login } from '../actions/userActions'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'formik-material-ui'
import styles from '../styles/Login.module.css'
import girl from '../assets/girl.png'

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
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

//validation schema
let validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
})

const Login = ({ location, history }) => {
  const classes = useStyle()

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = ({ email, password }) => {
    dispatch(login(email, password))
  }

  return (
    <>
      <div className={styles.Wrapper}>      
        <div className={styles.Left}>        
          <Grid container justify='center' className={classes.root}>
            <Grid item md={8}>
              <Card>
                <CardHeader title='SIGN IN'></CardHeader>
                {error && <Message severity='error'>{error}</Message>}                
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
                            <Grid item xs={12} sm={12} md={12}>
                              <Field
                                title='Please fill out this field'
                                label='Email Address'
                                variant='outlined'
                                fullWidth
                                name='email'
                                value={values.email}
                                component={TextField}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <Field
                                title='Please fill out this field'
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
                    to={
                      redirect ? `/register?redirect=${redirect}` : '/register'
                    }
                    className={classes.link}
                  >
                    Register
                  </Link>
                </Typography>
              </Card>
            </Grid>
          </Grid>
          </div>
          <div className={styles.Right}>
            <img alt='girl' src={girl} className={styles.Img} />
            <div>
              <p>
                Save your awesome{' '}
                <span className={styles.Caption}>memories</span> in here.
              </p>
            </div>
          </div>
        
      </div>
    </>
  )
}

export default Login
