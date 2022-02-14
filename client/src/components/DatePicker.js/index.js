import "date-fns";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import "./styles.css";
import moment from "moment";

const localeMap = {
  es: esLocale,
};

export default function MaterialUIPickers(props) {
  const [selectedDate, setSelectedDate] = React.useState(
    null
  );
  let tomorrow  = moment().add(1,'days');
  const [locale, setLocale] = useState("es");
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const newDate =
      date?.getFullYear() + "-" + (date?.getMonth() + 1) + "-" + date?.getDate();
    props.setfecha(newDate);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          minDate={tomorrow}
          label={props.leyenda}
          format="yyyy-MM-dd"
         value={selectedDate}
          onChange={handleDateChange}
          cancelLabel="Cancelar"
          emptyLabel="Ingresar fecha" 
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}