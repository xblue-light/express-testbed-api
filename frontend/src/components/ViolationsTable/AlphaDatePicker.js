import React, {useState , useEffect} from 'react';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { isSameDay } from 'date-fns/esm/fp';

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

const AlphaDatePicker = (props) => {

    const classes = useStyles();
    //const [selectedDate, handleDateChange] = useState(new Date());
    
    //console.log(selectedDate);
    // console.log(props.name);

    // function handleDateChange(date){
    //     console.log(selectedDate);
    // }

    // useEffect(() => {
    //     handleDateChange(selectedDate);
    // }, [selectedDate])

    return (
        <React.Fragment>
            <Grid container className={classes.grid}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker

                        margin="normal"
                        className={classes.datePickerInput}
                        id="mui-pickers-date"
                        format="d MMM yyyy"
                        value={props.defaultDate}
                        onChange= {
                            date => {
                                props.handleDateProps(date)
                            }
                        }
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    {/* <KeyboardDatePicker 
                        margin="normal"
                        className={classes.datePickerInput}
                        id="mui-pickers-date"
                        value={selectedDate}
                        style={{marginLeft: "15px"}}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    /> */}
                </MuiPickersUtilsProvider>
            </Grid>
        </React.Fragment>
    );
}

// function AlphaDatePicker(props) {

    
// }

export default AlphaDatePicker;
