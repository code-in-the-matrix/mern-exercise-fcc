import React, {Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Exercise = (props) => {
  return (
    <tr>
      <th>{props.exercise.userName}</th>
      <th>{props.exercise.description}</th>
      <th>{props.exercise.date.substring(0, 10)}</th>
      <th>{props.exercise.duration}</th>
      <th>
        <Link to = {"/edit/"+props.exercise._id} >Edit</Link> | <a href="#" onClick={()=>props.deleteExercise(props.exercise._id)}>
          Delete
        </a>
      </th>
    </tr>
  );
};
export default class ExerciseList extends Component {
  constructor(props) {
    super(props);
    // this.exercisesList = this.exercisesList.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = { exercises: [] };
  }

  deleteExercise(id) {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => console.log(res));

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }
  exercisesList() {
    return this.state.exercises.map((exercise) => {
      return <Exercise exercise={exercise} deleteExercise = {this.deleteExercise} key={exercise._id} />;
    });
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises")
      .then((response) => {
        this.setState({ exercises: response.data });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        <h3>Exercise List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exercisesList()}</tbody>
        </table>
      </div>
    );
  }
}
