import {makeStyles} from '@material-ui/core/styles'


export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(10),
      padding: '20px',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'right',
    },
    button: {
      fontWeight: 'bold',
    },
    input: {
      display: 'none',
    },
  }))