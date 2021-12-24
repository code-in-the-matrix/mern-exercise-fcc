import React, { Component } from "react";
import axios from 'axios';

class CreateUser extends Component {
  constructor(props) {
    super(props);

    // binding binding
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
    
    this.state = {
      userName: "",
    };
  }
  handleChange = (event) => {
    console.log("handle Change called");
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };
  
  onSubmit(e) {
    e.preventDefault();
    const user = {
      userName: this.state.userName,
    }
    console.log(user);
    axios.post('http://localhost:5000/users/add',user)
    .then(res => console.log(res.data)) 
    .catch((err)=>console.log(err))
    this.setState({
      userName : ''
    })
  }
  render() {
    return (
      <div >
        <h3>Add New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label> Username </label>
            <input
              type="text"
              name="userName"
              id="userName"
              value={this.state.userName}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
              <input type = "submit" className="btn btn-primary" value="Create Exercise log" />
          </div>
        </form>
      </div>
    );
  }
}


export default CreateUser