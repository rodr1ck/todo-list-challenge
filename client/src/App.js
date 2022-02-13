import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Listtareas from "./components/ListTareas";
import Nuevatarea from "./components/Nuevatarea";
import Details from "./views/Details";
import Main from "./views/Main";

function App() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

/*   useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("/tarea", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setRows(result);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  }, []); */

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
        <Route exact path="/tarea/:id">
              <Details />
            </Route>

            <Route exact path="/">
              <Main />
            </Route>

{/*           <Route exact path="/">
          <Listtareas rows={rows} loading={loading} />
          </Route> */}
          <Route exact path="/creatarea" element={<Nuevatarea />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
