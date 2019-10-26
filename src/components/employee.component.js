import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import Axios from 'axios';
import Modal from 'react-awesome-modal';

import '../css/StyleEmployee.css';

export default class EmployeeComponent extends Component {

    constructor(props) {
        super(props);

        // bind function
        this.onSubmit = this.onSubmit.bind(this);
        // this.setCompanyNameFromDatabase = this.setCompanyNameFromDatabase.bind(this);
        this.setCompanysAndProffesionsFromDBToState = this.setCompanysAndProffesionsFromDBToState.bind(this);

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            startTime: '00:00',
            endTime: '00:00',
            companys: [],
            company: '',
            professions: [],
            profession: '',
            modalVisible: false,
            messageOfModal: '',
        };

        this.setCompanysAndProffesionsFromDBToState();
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

    onChangeCompanyName = newCompany => {
        this.setState({
            company: newCompany.target.value
        }, () => console.log(this.state.company));
    };

    onChangeProfessionName = newProfession => {
        this.setState({
            profession: newProfession.target.value
        }, () => console.log(this.state.profession));
    };

    onChangeStartDate = date => {
        this.setState({
            startDate: date
        });
    };

    onChangeEndDate = date => {
        this.setState({
            endDate: date
        });
    };

    onChangeStartTime = time => {
        this.setState({
            startTime: time
        });
    };

    onChangeEndTime = time => {
        this.setState({
            endTime: time
        });
    };

    setCompanysAndProffesionsFromDBToState() {

        Axios.get('http://localhost:5000/companys')
            .then(result => {
                const companysArray = result.data;
                const namesOfCompanys = [];
                const nameOfProfessions = [];

                companysArray.forEach(companyObject => {
                    namesOfCompanys.push(companyObject.company);

                    const professionsArray = companyObject.professions;
                    professionsArray.forEach(professionObject => {
                        nameOfProfessions.push(professionObject.profession);
                    });

                });

                this.setState({
                    companys: namesOfCompanys,
                    company: namesOfCompanys[0],
                    professions: nameOfProfessions,
                    profession: nameOfProfessions[0],
                });
                // console.log(namesOfCompanys);
                // console.log(nameOfProfessions);
            });
    };

    // add to employee new work day
    onSubmit(event) {
        event.preventDefault();

        var query = window.location.search.substring(1);
        var workerNumber = query.split("=")[1];

        const company = this.state.company;
        const profession = this.state.profession;
        const startDate = this.state.startDate;
        const startTime = this.state.startTime;
        const endDate = this.state.endDate;
        const endTime = this.state.endTime;

        const newHoursToAdd = {
            company: company,
            hours: [
                {
                    start: startDate + " " + startTime,
                    end: endDate + " " + endTime,
                    profession: profession,
                }
            ],
        };




        Axios.post('http://localhost:5000/employees/' + workerNumber + '/employers/updateHours', newHoursToAdd)
            .then(result => {
                this.setState({
                    messageOfModal: result.data
                }, () => this.openModal());
                console.log(result.data);
            })
            .catch(err =>{ 
                this.setState({
                    messageOfModal: err +''
                }, () => this.openModal());
                console.log(err);
            });



    }


    render() {
        return (
            <div className="container-employee">
                <h1 className="header-employee" >Reporting hours</h1>
                <form className="form-employee" onSubmit={this.onSubmit}>
                    <div className="column form-group-company-name">
                        <label className="subtitle">Company</label>
                        <select className="form-control"
                            onChange={this.onChangeCompanyName}
                            value={this.state.company} >
                            {
                                this.state.companys.map((x, y) => <option key={y}>{x}</option>)
                            }
                        </select>
                    </div>
                    <div className="column form-group-profession-name">
                        <label className="subtitle">profession </label>
                        <select className="form-control"
                            onChange={this.onChangeProfessionName}
                            value={this.state.profession} >
                            {
                                this.state.professions.map((x, y) => <option key={y}>{x}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <div className=" form-group-start-time">
                            <label className="subtitle">Start time:</label>

                            <DatePicker className="date-picker"
                                selected={this.state.startDate}
                                onChange={this.onChangeStartDate} />

                            <TimePicker
                                value={this.state.startTime}
                                onChange={this.onChangeStartTime} />

                        </div>
                        <div className=" form-group-end-time">
                            <label className="subtitle">End time:</label>
                            <DatePicker className="date-picker"
                                selected={this.state.endDate}
                                onChange={this.onChangeEndDate} />

                            <TimePicker
                                value={this.state.endTime}
                                onChange={this.onChangeEndTime} />
                        </div>
                    </div>

                    <div className="form-group-submit-btn" >
                        <input type="submit" value="Add" className="btn btn-primary" />
                    </div>
                </form>

                <Modal className="modal"
                    visible={this.state.modalVisible}
                    width="400"
                    height="300"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >
                    <div className="modal-content">
                        <h5 className="header-modal">{this.state.messageOfModal}</h5>
                        <input type="button" value="Close" className="btn btn-primary" onClick={() => this.closeModal()}/>
                    </div>
                </Modal>
            </div>
        )
    }
}