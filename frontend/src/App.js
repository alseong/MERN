import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from "./components/Navbar.component.js"
import ExerciseList from "./components/ExerciseList.component.js"
import EditExercise from "./components/EditExercise.component.js"
import CreateExercise from "./components/CreateExercise.component.js"
import CreateUser from "./components/CreateUser.component.js"



function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <br />
        <Route path = "/" exact component = {ExerciseList} />
        <Route path = "/edit/:id" exact component = {EditExercise} />
        <Route path = "/create" exact component = {CreateExercise} />
        <Route path = "/user" exact component = {CreateUser} />
      </Router>
    </div>
  );
}

export default App;
