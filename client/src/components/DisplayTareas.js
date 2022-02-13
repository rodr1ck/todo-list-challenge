import React from 'react';
import { useParams, Link, useHistory } from "react-router-dom";

const Displaytareas = (props) => {

    const { loading, rows } = props;
    const history = useHistory();
    let newRows = [];

    if (rows.length > 0) {
        //var array = JSON.parse(rows);
        console.log(rows);
        newRows = rows.map((x) => {
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

    return (
        <div>
            Display Tareas
        </div>
    );
}

export default Displaytareas;
