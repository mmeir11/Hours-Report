import React, { Component } from 'react';
import Axios from 'axios';
import { json2csv, json2csvAsync } from 'json-2-csv';

let options = {
    delimiter : {
        wrap  : '', // Double Quote (") character
        field : [','], // Comma field delimiter
        // eol   : '\n' // Newline delimiter
        eol   : ['\n'] // Newline delimiter

    },
    prependHeader    : true,
    sortHeader       : false,
    excelBOM         : true,
    trimHeaderValues : true,
    trimFieldValues  : true,
    keys             : ['start', 'end', 'profession']
};

export default class Admin extends Component{

    constructor(props){
        super(props);

        // bind function
        this.onClickAddCompany = this.onClickAddCompany.bind(this);
        this.onClickAddNewProfession = this.onClickAddNewProfession.bind(this);
        this.onClickGetReport = this.onClickGetReport.bind(this);
        this.downloadCSV = this.downloadCSV.bind(this);

        this.state = {
         newCompany : '',
         fee: 0,
         companyToUpdate: '',
         newProfession: '',
         pay: 0,
         workerID : '',
         dataToCVS : 'null',
        };
    }

    onClickAddCompany(event){
        event.preventDefault();

        const companyName = this.state.newCompany;

        const newCompany = {
            company: companyName,
        };

         Axios.post('http://localhost:5000/companys/addNewCompany', newCompany)
        .then(result => console.log(result.data))
        .catch(err => console.log('Error ' + err));

        this.setState({
            newCompany : ''
        });
        
    }

    onClickAddNewProfession(event){
        event.preventDefault();

        const companyToUpdate = this.state.companyToUpdate;
        const profession = this.state.newProfession;
        const pay = this.state.pay;

        const newProfession = {
            company: companyToUpdate,
            profession : profession,
            pay: pay,
        };
        
        Axios.post('http://localhost:5000/companys/addNewProfession', newProfession)
        .then(result => console.log(result.data))
        .catch(err => console.log('Error ' + err));

        this.setState({
            companyToUpdate: '',
            newProfession : '',
            pay : 0,
        });

    }


    
    onClickGetReport(event){
        event.preventDefault();

        const workerID = this.state.workerID;
        Axios.get('http://localhost:5000/employees/getRepot/' + workerID)
        .then(result => {
            console.log(result.data);
            
            json2csv(result.data[0], (err, csv) => {
                if(err){
                    console.log('err');
                    
                }
                else{
                    //down CVS
                    console.log(csv)
                    this.downloadCSV(csv);
                }
             }, options);
            
            
        })
        .catch(err => console.log('Error ' + err));
    }
/* 
    JSON2CSV = (objArray) => {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var line = '';
    
        if ($("#labels").is(':checked')) {
            var head = array[0];
            if ($("#quote").is(':checked')) {
                for (var index in array[0]) {
                    var value = index + "";
                    line += '"' + value.replace(/"/g, '""') + '",';
                }
            } else {
                for (var index in array[0]) {
                    line += index + ',';
                }
            }
    
            line = line.slice(0, -1);
            str += line + '\r\n';
        }
    
        for (var i = 0; i < array.length; i++) {
            var line = '';
    
            if ($("#quote").is(':checked')) {
                for (var index in array[i]) {
                    var value = array[i][index] + "";
                    line += '"' + value.replace(/"/g, '""') + '",';
                }
            } else {
                for (var index in array[i]) {
                    line += array[i][index] + ',';
                }
            }
    
            line = line.slice(0, -1);
            str += line + '\r\n';
        }
        return str;
    }
     */

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

    onChangenewCompany = event =>{
        this.setState({
            newCompany : event.target.value,
        }/* , ()=> console.log(this.state.newCompany) */
           );
    }

    onChangeFee = event =>{
        this.setState({
            fee : event.target.value,
        });
    }


    onChangeCompanyToUpdate = event =>{
        this.setState({
            companyToUpdate: event.target.value,
        });
    }

    onChangeNewProfession = event =>{
        this.setState({
            newProfession: event.target.value,
        });
    }

    onChangePay = event =>{
        this.setState({
            pay: event.target.value,
        });
    }

    onChangeworkerID = event => {
        this.setState({
            workerID : event.target.value,
        });
    }


   

    render(){
        return (
            <div className="container">
                <h4>Admin page</h4>
                <form onSubmit={this.onClickAddCompany}>
                    <div className="form-group">
                        <div>
                            <label>Add new company: </label>
                            <input type="text" value={this.state.newCompany} onChange={this.onChangenewCompany}/>
                        </div>
                        <input className="btn btn-info" type="submit" 
                            value="Add company"/>
                    </div>
                    </form>
                    <hr/>
                    <form>
                    <div className="form-group">
                        <label>Add new profession: </label>
                        <input type="text" value={this.state.newProfession} onChange={this.onChangeNewProfession}/>
                    </div>
                    <div className="form-group">
                        <label>Pay per hour: </label>
                        <input type="number" value={this.state.pay} onChange={this.onChangePay}/>
                    </div>
                    <div className="form-group">
                        <label>Company: </label>
                        <input type="text" value={this.state.companyToUpdate} onChange={this.onChangeCompanyToUpdate}/>
                    </div>
                        <input className="btn btn-info" type="submit" 
                              value="Add profession" onClick={this.onClickAddNewProfession}/>
                    </form>
                    <hr/>
                    <form>
                        <div className="form-group">
                            <label>Worker ID: </label>
                            <input type="text" value={this.state.workerID} onChange={this.onChangeworkerID}/>
                        </div>
                            <input className="btn btn-primary" type="submit" 
                                    value="Get report" onClick={this.onClickGetReport}/>
                            <a attribute="download"></a>
                        
                    </form>     
                    
                    

                
            </div>
        )
    }
}