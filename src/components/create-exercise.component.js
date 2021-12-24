import React, { Component } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';

class CreateExercise extends Component {
  constructor(props) {
    super(props);

    // binding binding
    this.handleChange = this.handleChange.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this);
    
    this.onSubmit = this.onSubmit.bind(this)
    
    this.state = {
      userName: "",
      duration: 0,
      description: "",
      date: new Date(),
      users: [],
    };
  }
  componentDidMount() {
    axios.get('http://localhost:5000/users/')
    .then(response => {
      if(response.data.length > 0){
        this.setState({
          users: response.data.map(user=>user.userName),
          userName: response.data[0].userName
        });
      }
    }).catch(err => console.log("Error in " + err))
  }
  handleChange = (event) => {
    console.log("handle Change called");
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };
  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }
  onChangeUsername(e){
    this.setState({
      userName : e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      userName: this.state.userName,
      duration: this.state.duration,
      description: this.state.description,
      date: this.state.date
    }
    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add',exercise)
    .then((res) => {console.log(res.data)
      })
    .catch(err=>console.log(err))
    window.location.href = 'http://localhost:3000/'
    
  }
  render() {
    return (
      <div >
        <h3>Create New Exercise</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>UserName</label>
            <select
              ref="userInput"
              required
              value={this.state.userName}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
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
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label> Duration(in minutes) </label>
            <input
              type="text"
              name="duration"
              id="duration"
              value={this.state.duration}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
              <input type = "submit" className="btn btn-primary" value="Create Exercise log" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateExercise;
