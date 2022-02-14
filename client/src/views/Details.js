import React from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const Details = () => {
  let { id } = useParams();
  const history = useHistory();
  const deleteTask = (tareaId) => {
    axios.delete("/tarea/" + tareaId).then((res) => {
      alert("Has eliminado una tarea");
      history.push("/");
    });
  };

  return (
    <>
      <div className="adopdiv-style">
        <h3 className="h3" style={{ marginBottom: "40px" }}>
          Estas seguro que deseas borrar la tarea?
        </h3>
        <button
          onClick={(e) => {
            deleteTask(id);
          }}
          className="btn btn-outline-primary pt-1"
        >
          Eliminar Tarea {id}
        </button>
      </div>
    </>
  );
};

export default Details;
