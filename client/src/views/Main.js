import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import callApiTarea from "../actions/callApiTarea";
import TablaTareas from "../components/TablaTareas";
import Displaytareas from "../components/DisplayTareas";

const Main = () => {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callApiTarea()
      .then(({ success, data }) => {
        if (success) {
            console.log("data: ", data);
          setTareas(data);
          setLoading(false);
        } else console.log("Sucedio un error");
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
       {!loading ? <TablaTareas loading={loading} rows={tareas} /> : "Loading..." } 

   {/*  {!loading ? <Displaytareas loading={loading} rows={tareas} /> : "Loading..." } */}  

   </div>
  );
};

export default Main;
