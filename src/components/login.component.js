import React, { Component } from 'react';
import Axios from 'axios';
import '../css/StyleLogin.css';
import Modal from 'react-awesome-modal';
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
      password: '',
      modalVisible: false,
      messageOfModal: '',
    }

  }

  openModal = () => {
    this.setState({
      modalVisible: true
    });
  }

  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  }

  onSubmit(event) {
    event.preventDefault();

    var username = this.state.username;
    var password = this.state.password;

    Axios.get('http://localhost:5000/users/' + username)
      .then((result) => {
        if (result.data != null && result.data.username == username && result.data.password == password) {
          if (result.data.username == 999) {
            window.location = '/admin';
          }
          else {
            window.location = '/employee?workerNumber=' + this.state.username;
          }
        }
        else {
          this.setState({
            messageOfModal: 'username/password is incorrect'
          }, () => this.openModal());
        }

      })
      .catch(err => {
        this.setState({
          messageOfModal: err + ''
        }, () => this.openModal());
        console.log('Error: ' + err);
      });

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

        <Modal className="modal"
          visible={this.state.modalVisible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()} >
          <div className="modal-content">
            <h5 className="header-modal">{this.state.messageOfModal}</h5>
            <input type="button" value="Close" className="btn btn-info" onClick={() => this.closeModal()} />
          </div>
        </Modal>
      </div>
    )
  }
}