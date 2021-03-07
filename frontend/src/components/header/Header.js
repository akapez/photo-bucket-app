import React from 'react'
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
              <Link to="/login">
              <Button color="inherit">Login</Button>
              </Link>
            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>
    </>
  )
}

export default Header
