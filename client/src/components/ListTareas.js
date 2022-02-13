import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";

const Listtareas = (props) => {
  const { loading, rows } = props;
  const history = useHistory();
  let newRows = [];

  if (rows.length > 0) {
    var array = JSON.parse(rows);
    console.log(array);
    newRows = array.map((x) => {
      const id = x.tareaId;
      const descripcion = x.descripcion;
      const fecha = x.fecha;
      const responsable = x.responsable;
      const id_borrar = x.tareaId;
      //const id_edit = x.id

      return { id, descripcion, fecha, responsable, id_borrar };
    });
  }

  console.log(Array.isArray(newRows));

  console.log("rows ", newRows);

  const handlePurge = (params) => {
     // e.preventDefault();
    console.log("borrando tarea", params);
    console.log("Info borrar: ", params.row.id_borrar);
    history.push(`/tarea/${params.row.id_borrar}`)

  };

  const handleEdit = (e) => {
    console.log("editando tarea");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    {
      field: "descripcion",
      headerName: "Descripcion",
      width: 250,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      width: 250,
    },
    {
      field: "responsable",
      headerName: "Responsable",
      width: 250,
    },
    {
      field: "id_borrar",
      headerName: "Borrar Tarea",
      width: 200,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Button
            style={{
              borderRadius: 18,
              backgroundColor: "#58b062",
              padding: "18px 36px",
            }}
            variant="contained"
            color="primary"
            onClick={() => handlePurge(params)}
          >
            Borrar
          </Button>
        );
      },
    },
  ];

  return !loading ? (
    <>
      <div className="container" style={{ height: 550, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={newRows}
          columns={columns}
          pageSize={40}
          rowsPerPageOptions={[40]}
          density={"compact"}
          disableSelectionOnClick
        />
      </div>
    </>
  ) : (
    "Loading..."
  );
};

export default Listtareas;
