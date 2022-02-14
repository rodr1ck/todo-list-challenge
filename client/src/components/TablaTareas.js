import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@mui/material/IconButton";

const TablaTareas = (props) => {
  const { rows } = props;
  const history = useHistory();
  let newRows = [];

  if (rows.length > 0) {
    newRows = rows.map((x) => {
      const id = x.tareaId;
      const descripcion = x.descripcion;
      const fecha = x.fecha;
      const responsable = x.responsable;
      const id_borrar = x.tareaId;
      return { id, descripcion, fecha, responsable, id_borrar };
    });
  }

  const handlePurge = (params) => {
    history.push(`/tarea/${params.row.id_borrar}`);
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
          <IconButton
            edge="end"
            aria-label="delete"
            color="primary"
            onClick={() => handlePurge(params)}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <>
      <div
        className="container"
        style={{ height: 550, width: "100%", marginTop: "20px" }}
      >
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
  );
};

export default TablaTareas;
