import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Nuevatarea from "./components/Nuevatarea";
import Details from "./views/Details";
import Main from "./views/Main";

function App() {

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
          <Route exact path="/creatarea">
            <Nuevatarea />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
