import React, { Component } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';

class EditExercise extends Component {
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
    console.log("this: " , this)
    console.log("this.props: ", this.props)
    // axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
    //   .then(response => {
    //     this.setState({
    //       userName: response.data.userName,
    //       description: response.data.description,
    //       duration: response.data.duration,
    //       date: new Date(response.data.date)
    //     })   
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.userName),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

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

    axios.patch('http://localhost:5000/exercises/edit/'+this.props.match.params.id,exercise)
    .then((res) => {console.log(res.data)
      })
    .catch(err=>console.log(err))
    window.location.href = 'http://localhost:3000/'
    
  }
  render() {
    return (
      <div >
        <h3>Edit Exercise</h3>
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
              <input type = "submit" className="btn btn-primary" value="Edit Exercise log" />
          </div>
        </form>
      </div>
    );
  }
}

export default EditExercise;

// import React, { Component } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

// export default class EditExercise extends Component {
//   constructor(props) {
//     super(props);

//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.onChangeDuration = this.onChangeDuration.bind(this);
//     this.onChangeDate = this.onChangeDate.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);

//     this.state = {
//       username: '',
//       description: '',
//       duration: 0,
//       date: new Date(),
//       users: []
//     }
//   }

//   componentDidMount() {
//     axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
//       .then(response => {
//         this.setState({
//           username: response.data.username,
//           description: response.data.description,
//           duration: response.data.duration,
//           date: new Date(response.data.date)
//         })   
//       })
//       .catch(function (error) {
//         console.log(error);
//       })

//     axios.get('http://localhost:5000/users/')
//       .then(response => {
//         if (response.data.length > 0) {
//           this.setState({
//             users: response.data.map(user => user.username),
//           })
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       })

//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value
//     })
//   }

//   onChangeDescription(e) {
//     this.setState({
//       description: e.target.value
//     })
//   }

//   onChangeDuration(e) {
//     this.setState({
//       duration: e.target.value
//     })
//   }

//   onChangeDate(date) {
//     this.setState({
//       date: date
//     })
//   }

//   onSubmit(e) {
//     e.preventDefault();

//     const exercise = {
//       username: this.state.username,
//       description: this.state.description,
//       duration: this.state.duration,
//       date: this.state.date
//     }

//     console.log(exercise);

//     axios.patch('http://localhost:5000/exercises/edit/' + this.params.id, exercise)
//       .then(res => console.log(res.data));

//     window.location = '/';
//   }

//   render() {
//     return (
//     <div>
//       <h3>Edit Exercise Log</h3>
//       <form onSubmit={this.onSubmit}>
//         <div className="form-group"> 
//           <label>Username: </label>
//           <select ref="userInput"
//               required
//               className="form-control"
//               value={this.state.username}
//               onChange={this.onChangeUsername}>
//               {
//                 this.state.users.map(function(user) {
//                   return <option 
//                     key={user}
//                     value={user}>{user}
//                     </option>;
//                 })
//               }
//           </select>
//         </div>
//         <div className="form-group"> 
//           <label>Description: </label>
//           <input  type="text"
//               required
//               className="form-control"
//               value={this.state.description}
//               onChange={this.onChangeDescription}
//               />
//         </div>
//         <div className="form-group">
//           <label>Duration (in minutes): </label>
//           <input 
//               type="text" 
//               className="form-control"
//               value={this.state.duration}
//               onChange={this.onChangeDuration}
//               />
//         </div>
//         <div className="form-group">
//           <label>Date: </label>
//           <div>
//             <DatePicker
//               selected={this.state.date}
//               onChange={this.onChangeDate}
//             />
//           </div>
//         </div>

//         <div className="form-group">
//           <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
//         </div>
//       </form>
//     </div>
//     )
//   }
// }