import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import moment from "moment";
import "moment/locale/es";
import MaterialUIPickers from "./DatePicker.js";
//import MaterialUIPickers from "./DatePicker";

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
  let history = useHistory();
  const handleOpenAlert = (mensaje, tipo) => {
    setAlert({ open: true, message: mensaje, severity: tipo });
  };

  const [openAlert, setOpenAlert] = useState(false);
  const [mensaje_alerta, setMensaje_alerta] = useState();
  const [titulo_alerta, setTitulo_alerta] = useState();

  const today = new Date();
  const dateInicial = moment().add(1,'days');
  //const [fecha_inicial, setFecha_inicial] = useState(dateInicial);
 // const hoydia =
  //  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  //const fecha_inicial_01 = moment(fecha_inicial, "YYYY-MM-DD");
  //const hoydia_01 = moment(hoydia, "YYYY-MM-DD");

  const [tareaFecha, setTareaFecha] = useState(dateInicial);
  const [tareaDescripcion, setTareaDescripcion] = useState("");
  const [tareaResponsable, setTareaResponsable] = useState("");

  const [errorsTareaFecha, setErrorsTareaFecha] = useState();
  const [errorsTareaDescripcion, setErrorsTareaDescripcion] = useState();
  const [errorsTareaResponsable, setErrorsTareaResponsable] = useState();

  const paperStyle = {
    padding: 20,
    width: 280,
    margin: "20px auto",
  };



  const handleTareaFechaChange = (event) => {
    const {
      target: { value },
    } = event;
    setErrorsTareaFecha({ tareaFecha: "" });
    setTareaFecha(value);

    let reg = new RegExp(/\S+/).test(value);

    if (!reg) {
      setErrorsTareaFecha({
        tareaFecha: "Formato de fecha incorrecto",
      });
    }
  };

  const handleTareaDescripcionChange = (event) => {
    const {
      target: { value },
    } = event;
    setErrorsTareaDescripcion({ tareaDescripcion: "" });
    setTareaDescripcion(value);

    let reg = new RegExp(/\S+/).test(value);

    if (!reg) {
      setErrorsTareaDescripcion({
        tareaDescripcion: "Formato de descripcion incorrecta",
      });
    }
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

{/*             <TextField
              value={tareaFecha}
              onChange={handleTareaFechaChange}
              inputProps={{ maxLength: 80 }}
              label="Fecha"
              placeholder="Ingresar fecha"
              type="text"
              fullWidth
              required
              error={Boolean(errorsTareaFecha?.tareaFecha)}
              helperText={errorsTareaFecha?.tareaFecha}
            /> */}

            {/*              <TextField
              value={productoDescripcion}
              onChange={handleProductoDescripcionChange}
              inputProps={{ maxLength: 80 }}
              label="Descripcion"
              placeholder="Ingresar descripcion"
              type="text"
              fullWidth
              maxRows={4}
              required
              error={Boolean(errorsProductoDescripcion?.productoDescripcion)}
              helperText={errorsProductoDescripcion?.productoDescripcion}
            />  */}

            <TextareaAutosize
              aria-label="minimum height"
              label="Descripcion"
              value={tareaDescripcion}
              onChange={handleTareaDescripcionChange}
              maxRows={4}
              placeholder="Ingresar descripcion"
              maxLength={200}
              style={{ width: 240, marginTop: "10px" }}
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
