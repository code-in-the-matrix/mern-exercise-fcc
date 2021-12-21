import React from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercises-list.component";
import CreateUser from "./components/create-user.component";
import CreateExercise from "./components/create-exercise.component";
import EditExercise from "./components/edit-exercise.component";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <br />
      <Routes>
        <Route path="/" exact={true} element={<ExerciseList/>} /> 
        <Route path="/create" element={<CreateExercise/>} />
        <Route path="/edit/:id" element={<EditExercise/>} />
        <Route path="/user" element={<CreateUser/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
