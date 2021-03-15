import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(10),
    padding: theme.spacing(3),
  },
  button: {
    fontWeight: 'bold',
  },
  input: {
    display: 'none',   
  },
  inputDisplay: {
    padding: '12px 20px',
    margin: '8px 0',
    boxSizing: 'border-box',
    border: '3px solid #ccc',
  }
}))
