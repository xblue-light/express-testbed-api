import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
//import { format } from 'date-fns'

// CSS
const useStyles = makeStyles({
  grid: {
    width: '50%',
  },
  datePickerInput: {
    width: '175px',
    border: '1px solid #e8e9ec',
    borderRadius: '4px',
    padding: '5px 10px',
  }
});

//const AlphaDatePicker = ({ startDate, endDate, onChangeStart, onChangeEnd, resetInitialState }) => {
const AlphaDatePicker = (props) => {

    const classes = useStyles();
    // const [selectedDate, handleDateChange] = React.useState(new Date());

    // useEffect(() => {
    //         handleDateChange(selectedDate);
    //         console.log(selectedDate)
    // }, [selectedDate])


    return (
        <React.Fragment>
            <Grid container className={classes.grid}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    {/* <span style={{position: 'relative', top: '25px', right: '5px'}}>От</span> */}
                    <KeyboardDatePicker
                        disableFuture
                        clearable
                        autoOk
                        margin="normal"
                        className={classes.datePickerInput}
                        id="mui-pickers-date"
                        format="dd-MM-yyyy"
                        placeholder="Избери дата от:"
                        value={props.startDate}                        
                        onChange= { date => { props.onChangeStart(date) } }
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    {/* <span style={{position: 'relative', top: '25px', left: '10px'}}>До</span> */}
                    <KeyboardDatePicker
                        disableFuture
                        clearable
                        margin="normal"
                        className={classes.datePickerInput}
                        id="mui-pickers-date"
                        format="dd-MM-yyyy"
                        onAccept={props.compareFromToDates}
                        placeholder="Избери дата до:"
                        style={{marginLeft: '15px'}}
                        value={props.endDate}
                        onChange= { date => { props.onChangeEnd(date) } }
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Grid>
        </React.Fragment>
    );
}

export default AlphaDatePicker;
