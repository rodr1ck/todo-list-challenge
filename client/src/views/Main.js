import React, { useEffect, useState } from "react";
import callApiTarea from "../actions/callApiTarea";
import TablaTareas from "../components/TablaTareas";

const Main = () => {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callApiTarea()
      .then(({ success, data }) => {
        if (success) {
          setTareas(data);
          setLoading(false);
        } else console.log("Sucedio un error");
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      {!loading ? (
        <TablaTareas loading={loading} rows={tareas} />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Main;
