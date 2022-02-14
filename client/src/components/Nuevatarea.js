import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import moment from "moment";
import "moment/locale/es";
import MaterialUIPickers from "./DatePicker.js";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#2f4554",
    margin: "8px 0",
    color: "white",
    "&:hover": {
      backgroundColor: "#253642",
    },
    "&:disabled": {
      backgroundColor: "gray",
    },
  },
});

const Nuevatarea = () => {
  const [alert, setAlert] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const classes = useStyles();
  const handleOpenAlert = (mensaje, tipo) => {
    setAlert({ open: true, message: mensaje, severity: tipo });
  };

  const [tareaFecha, setTareaFecha] = useState(null);
  const [tareaDescripcion, setTareaDescripcion] = useState("");
  const [tareaResponsable, setTareaResponsable] = useState("");
  const [errorsTareaResponsable, setErrorsTareaResponsable] = useState();

  const paperStyle = {
    padding: 20,
    width: 280,
    margin: "20px auto",
  };

  const handleTareaDescripcionChange = (event) => {
    const {
      target: { value },
    } = event;
    setTareaDescripcion(value);
  };

  const handleTareaResponsableChange = (event) => {
    const {
      target: { value },
    } = event;
    setErrorsTareaResponsable({ tareaResponsable: "" });
    setTareaResponsable(value);

    let reg = new RegExp(/^[a-zA-Z ]+$/).test(value);

    if (!reg) {
      setErrorsTareaResponsable({
        tareaResponsable: "Formato de responsable incorrecto",
      });
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("/tarea", {
        fecha: tareaFecha,
        responsable: tareaResponsable,
        descripcion: tareaDescripcion,
      })
      .then((res) => {
        if (res.status == 200) {
          handleOpenAlert("Registro exitoso", "success");
          setTareaDescripcion("");
          setTareaResponsable("");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false, message: alert.message, severity: alert.severity });
  };

  return (
    <>
      <div>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <h4 className="h4">Crear Nueva Tarea</h4>
            </Grid>

            <MaterialUIPickers
              leyenda={"Fecha"}
              fecha={tareaFecha}
              setfecha={setTareaFecha}
            />
            <TextareaAutosize
              aria-label="minimum height"
              label="Descripcion"
              value={tareaDescripcion}
              onChange={handleTareaDescripcionChange}
              maxRows={4}
              placeholder="Ingresar descripcion"
              maxLength={200}
              style={{ width: 240, marginTop: "15px" }}
              required
            />
            <TextField
              value={tareaResponsable}
              onChange={handleTareaResponsableChange}
              inputProps={{ maxLength: 35 }}
              label="Responsable"
              placeholder="Ingresar responsable"
              type="text"
              fullWidth
              required
              error={Boolean(errorsTareaResponsable?.tareaResponsable)}
              helperText={errorsTareaResponsable?.tareaResponsable}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={onSubmit}
              disabled={
                errorsTareaResponsable?.tareaResponsable?.length > 0 ||
                tareaFecha == undefined ||
                tareaResponsable == undefined ||
                tareaFecha?.length < 1
              }
              className={classes.root}
            >
              Crear Tarea
            </Button>
          </Paper>
        </Grid>
        <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            variant="filled"
            onClose={handleCloseAlert}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Nuevatarea;
