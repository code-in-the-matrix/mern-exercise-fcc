import React, { useEffect, useState , useRef} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditExercise() {
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  const userNameRef = useRef()
  const durationRef = useRef()
  const descriptionRef = useRef()
  const dateRef = useRef()

  let { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/" + id)
      .then((response) => {
          setUserName ( response.data.userName);
          setDescription ( response.data.description);
          setDuration (response.data.duration);
          setDate (new Date(response.data.date));
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          setUsers(response.data.map((user) => user.userName),);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // function handleChange  (event) {
    // console.log("handle Change called");
    // const { name, value } = event.target;

    // this.setState({
    //   [name]: value,
    // });
  // };
  // function onChangeDate(date) {
    // this.setState({
    //   date: date,
    // });
  // }
  // function onChangeUsername(e) {
    // this.setState({
    //   userName: e.target.value,
    // });
  // }
  function onSubmit(e) {
    e.preventDefault();
    const exercise = {
      userName:userNameRef.current.value,
      duration:durationRef.current.value,
      description:descriptionRef.current.value,
      date:dateRef.current.value,
    };
    console.log(exercise);

    // axios
    //   .patch(
    //     "http://localhost:5000/exercises/edit/" + this.props.match.params.id,
    //     exercise
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => console.log(err));
    // window.location.href = "http://localhost:3000/";
  }

  return (
    <div>
      <h3>Edit Exercise</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>UserName</label>
          <select
            ref={userNameRef}
            required
          >
            {users.map(function (user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label> Description </label>
          <input
            type="text"
            name="description"
            id="description"
            ref={descriptionRef}
            
          />
        </div>
        <div className="form-group">
          <label> Duration(in minutes) </label>
          <input
            type="text"
            name="duration"
            id="duration"
            ref={durationRef}
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <div>
            <DatePicker
              selected={date}
              ref={dateRef}
            />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            className="btn btn-primary"
            value="Edit Exercise log"
          />
        </div>
      </form>
    </div>
  );
}

export default EditExercise;

