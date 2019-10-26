import React, { Component } from 'react';
import Axios from 'axios';
import { json2csv } from 'json-2-csv';
import Modal from 'react-awesome-modal';

import '../css/StyleAdmin.css';


let options = {
    delimiter: {
        wrap: '', // Double Quote (") character
        field: [','], // Comma field delimiter
        // eol   : '\n' // Newline delimiter
        eol: ['\n'] // Newline delimiter

    },
    prependHeader: true,
    sortHeader: false,
    excelBOM: true,
    trimHeaderValues: true,
    trimFieldValues: true,
    keys: ['start', 'end', 'profession']
};

export default class Admin extends Component {

    constructor(props) {
        super(props);

        // bind function
        this.onClickAddCompany = this.onClickAddCompany.bind(this);
        this.onClickAddNewProfession = this.onClickAddNewProfession.bind(this);
        this.onClickGetReport = this.onClickGetReport.bind(this);
        this.downloadCSV = this.downloadCSV.bind(this);

        this.state = {
            newCompany: '',
            fee: '',
            companyToUpdate: '',
            newProfession: '',
            pay: '',
            workerID: '',
            dataToCVS: 'null',
            modalVisible: false,
            messageOfModal: '',

        };
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

    onClickAddCompany(event) {
        event.preventDefault();

        const companyName = this.state.newCompany;

        const newCompany = {
            company: companyName,
        };

        Axios.post('http://localhost:5000/companys/addNewCompany', newCompany)
            .then(result => {
                this.setState({
                    messageOfModal: result.data + ''
                }, () => this.openModal());
                console.log(result.data);
            })
            .catch(err => {
                this.setState({
                    messageOfModal: err + ''
                }, () => this.openModal());
                console.log('Error: ' + err)
            });

        this.setState({
            newCompany: ''
        });

    }

    onClickAddNewProfession(event) {
        event.preventDefault();

        const companyToUpdate = this.state.companyToUpdate;
        const profession = this.state.newProfession;
        const pay = this.state.pay;

        const newProfession = {
            company: companyToUpdate,
            profession: profession,
            pay: pay,
        };

        Axios.post('http://localhost:5000/companys/addNewProfession', newProfession)
            .then(result => {
                this.setState({
                    messageOfModal: result.data + ''
                }, () => this.openModal());
                console.log(result.data);
            })
            .catch(err => {
                this.setState({
                    messageOfModal: err + ''
                }, () => this.openModal());
                console.log('Error: ' + err)
            });

        this.setState({
            companyToUpdate: '',
            newProfession: '',
            pay: 0,
        });

    }



    onClickGetReport(event) {
        event.preventDefault();

        const workerID = this.state.workerID;
        Axios.get('http://localhost:5000/employees/getRepot/' + workerID)
            .then(result => {
                console.log(result.data);

                json2csv(result.data[0], (err, csv) => {
                    if (err) {
                        console.log('err');

                    }
                    else {
                        //down CVS
                        console.log(csv)
                        this.downloadCSV(csv);
                    }
                }, options);


            })
            .catch(err => {
                this.setState({
                    messageOfModal: 'Error'
                }, () => this.openModal());
                console.log('Error: ' + err)
            });
    }

    downloadCSV(csv) {
        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", csv]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "data.csv";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    onChangenewCompany = event => {
        this.setState({
            newCompany: event.target.value,
        }/* , ()=> console.log(this.state.newCompany) */
        );
    }

    onChangeFee = event => {
        this.setState({
            fee: event.target.value,
        });
    }


    onChangeCompanyToUpdate = event => {
        this.setState({
            companyToUpdate: event.target.value,
        });
    }

    onChangeNewProfession = event => {
        this.setState({
            newProfession: event.target.value,
        });
    }

    onChangePay = event => {
        this.setState({
            pay: event.target.value,
        });
    }

    onChangeworkerID = event => {
        this.setState({
            workerID: event.target.value,
        });
    }

    render() {
        return (
            <div className="container-admin">
                <div className="header-admin">Admin page</div>
                <form className="form-admin">
                    <div className="group form-group-company">
                        <label className="subtitle-admin">Add new company</label>
                        <div>
                            <input type="text" className="admin-field" placeholder="Company name" value={this.state.newCompany} onChange={this.onChangenewCompany} />
                        </div>
                        <div className="btn-add">
                            <input className="btn btn-primary" onClick={this.onClickAddCompany} type="submit"
                                value="Add company" />
                        </div>
                    </div>

                    <div className="group form-group-profession">
                        <label className="subtitle-admin">Add new profession</label>
                        <input type="text" className="admin-field" placeholder="Profession" value={this.state.newProfession} onChange={this.onChangeNewProfession} />
                        <input type="number" className="admin-field" placeholder="Pay per hour" value={this.state.pay} onChange={this.onChangePay} />
                        <input type="text" className="admin-field" placeholder="Company" value={this.state.companyToUpdate} onChange={this.onChangeCompanyToUpdate} />
                        <div className="btn-add">
                            <input className="btn btn-primary" type="submit"
                                placeholder="Add new company" value="Add profession" onClick={this.onClickAddNewProfession} />
                        </div>
                    </div>

                    <div className="group form-group-report">
                        <label className="subtitle-admin">Report</label>
                        <input type="text" className="admin-field" placeholder="Worker ID" value={this.state.workerID} onChange={this.onChangeworkerID} />
                        <div>
                            <input className="btn btn-info" type="submit"
                                value="Download report" onClick={this.onClickGetReport} />
                            <a attribute="download"></a>
                        </div>
                    </div>



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