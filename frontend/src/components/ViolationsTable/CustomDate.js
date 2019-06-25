import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
    padding: '3px',
    borderRadius: '4px',
    border: '1px solid #e8e9ec',
  },
}));

export default function CustomDate() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <span className="labelDatePicker">От</span>
      <TextField
        id="fromDatePicker"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <span className="labelDatePicker">До</span>
      <TextField
        id="toDatePicker"
        type="date"
        defaultValue="2017-05-25"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}