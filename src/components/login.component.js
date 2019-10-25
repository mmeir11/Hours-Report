import React, { Component } from 'react';
import Axios from 'axios';
import { MDBInput } from "mdbreact";
import '../css/StyleLogin.css';


import Button from '@material-ui/core/Button';

export default class Login extends Component {

  constructor(props) {
    super(props);

    // bind function
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onClickRegisterBtn = this.onClickRegisterBtn.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    }

  }

  onSubmit(event) {
    event.preventDefault();

    const username = this.state.username;
    const password = this.state.password;

    Axios.get('http://localhost:5000/users/' + username)
      .then((result) => {
        if (result.data.username == username && result.data.password == password) {
          if (result.data.username == 999) {
            window.location = '/admin';
          }
          else {
            window.location = '/employee?workerNumber=' + this.state.username;
          }
        }
        else {
          console.log("Not correct");
        }

      })
      .catch(err => console.log('Error: ' + err));

  };

  onChangeUsername(event) {

    this.setState({
      username: event.target.value
    });

  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  onClickRegisterBtn(event) {
    window.location = '/register';
  }

  render() {
    return (
      // container
      <div className="login">
        <h1 className="header-login">Login</h1>
        <form className="form-login" onSubmit={this.onSubmit}>

          <div className="form-group username">
            <input className="filed" type="number" placeholder="  Worker ID"
              value={this.state.username} onChange={this.onChangeUsername} />
          </div>

          <div className="form-group password">
            <input className="filed" type="password" placeholder="  Password"
              value={this.state.password} onChange={this.onChangePassword} />
          </div>

          <Button>
            <input type="submit" value="Login" className="btn btn-primary login-btn" />
          </Button>

          <Button variant="contained" color="secondary" onClick={this.onClickRegisterBtn}>
            Register
                </Button>


        </form>
      </div>
    )
  }
}