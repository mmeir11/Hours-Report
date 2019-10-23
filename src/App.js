import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Admin from "./components/admin.component";
import Register from "./components/register.component";
import EmployeeComponent from "./components/employee.component";
import Login from "./components/login.component";
import Navbar from "./components/navbar.component";


function App() {
  return (
    <Router>
      <div className="root">
        <Navbar/>

        <br/>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/employee" exact component={EmployeeComponent} />
        <Route path="/admin" exact component={Admin} />
      </div>
    </Router>
  );
}

export default App;
