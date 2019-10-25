import React, { Component } from 'react';
import Axios from 'axios';
// import './StyleRegister.css';

import '../css/StyleRegister.css';


export default class Register extends Component{

    constructor(props){
        super(props);

        // bind function
        this.onChangeWorkerNumber = this.onChangeWorkerNumber.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          workerNumber: '',
          password: ''
        }

    }

    onSubmit(event){
      event.preventDefault();
    if(this.state.workerNumber.length > 0 && this.state.password.length > 0){

      const newUser = {
          username: this.state.workerNumber,
          password: this.state.password
      };

      const newEmployee = {
        username : this.state.workerNumber,
        employer : []
      }

      console.log(newEmployee + "Registerion successed!");

      Axios.post('http://localhost:5000/users/add', newUser)
      .then( result => console.log(result.data));

      Axios.post('http://localhost:5000/employees/add', newEmployee)
      .then(result => console.log(result.data));


        this.setState({
            workerNumber : '',
            password: ''
        });

        window.location = '/employee?workerNumber=' + this.state.workerNumber;

      }
      else{
        alert('Fill in all fields!');
      }
    
    
    }

    onChangeWorkerNumber(event){

      this.setState({ 
        workerNumber: event.target.value 
      }, () =>{
        //  console.log(this.state.workerNumber)
         });
      
    }

    onChangePassword(event){
      this.setState({
        password: event.target.value
      }, () => {
        // console.log(this.state.password)

      });
    }

    render(){
        return (
            <div className="register">
              <h1 className="header-register">Register</h1>

              <form className="form-register" onSubmit={this.onSubmit}>
                <div className="form-group username">
                  <input className="filed" type="number" placeholder = "   Worker ID" 
                         value={this.state.workerNumber} onChange={this.onChangeWorkerNumber} />
                </div>
                <div className="form-group password">
                  <input className="filed" type="password"  placeholder="   Password"
                         value={this.state.password} onChange={this.onChangePassword} />
                </div>
                <input type="submit" value="Registration" className="btn btn-primary registertion-btn" />
              </form>
              </div>
        )
    }
}