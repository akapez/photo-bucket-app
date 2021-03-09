import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  AppBar,
  Toolbar,
  Typography,
  createMuiTheme,
  ThemeProvider,
  Button
} from '@material-ui/core'
import {Link} from 'react-router-dom'
import logo from '../../assets/logo.png'
import { useStyles } from './classes'
import {logout} from '../../actions/userActions'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
    },
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },  
})

const Header = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position='fixed' >
            <Toolbar>
              <img src={logo} alt='logo' className={classes.logo} />
              <Typography variant='h6' className={classes.title}>
                Photo Bucket
              </Typography>
              {userInfo ? (
                <Link to="/login" style={{textDecoration: 'none'}}>
                <Button variant='outlined' className={classes.button} onClick={logoutHandler}>Logout</Button>
                </Link>
              ) : <Link to="/login" style={{textDecoration: 'none'}}>
              <Button variant='outlined' className={classes.button}>Login</Button>
              </Link>}
              
            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>
    </>
  )
}

export default Header
