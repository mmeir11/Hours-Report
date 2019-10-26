const router = require('express').Router();
let Employee = require('../models/employee.model');


// get all the Employees
router.route('/').get((request, response) =>{
    Employee.find()
    .then(employees => response.json(employees))
    .catch(err => response.status(400).json('Error: '+ err));
});

// Add new employee
router.route('/add').post((request, response) =>{
    const username = request.body.username;
    const employer = request.body.employer;

    const newEmployee = new Employee({username, employer});

    newEmployee.save()
    .then(()=> response.json('Employee added!'))
    .catch(err => response.status(400).json('Error: ' + err));
});

// get all the eployers of specifie emplyee
router.route('/:username/employers').get((request, response) =>{
    Employee.findOne({username: request.params.username})
    .then(employee => response.json(employee['employer']))
    .catch(err => response.status(400).json('Error: '+ err));
    
});

// update to emplyee new hours 
router.route('/:username/employers/updateHours').post( (request, response) => {
    Employee.findOne({username: request.params.username})
    .then(employee => {
        // get the employers array from specific employee
        const employerArray = employee.employer;

        const employerToUpdate = employerArray.find( ({ company }) => company === request.body.company);
         
        if(employerToUpdate != null)  // find the employer and update the new hours
        {
            const newHours = request.body.hours[0];
                
            employerToUpdate.hours.push(newHours);
            const updatedEmployee = new Employee(employee);
            
            updatedEmployee.save()
            .then(() =>{response.json('Employee updated!')})
            .catch(err => response.status(400).json('Error: ' + err));
        }
        else  // if not found the employer , push new employer and update the hours
        {  
            employerArray.push(request.body);
            const updatedEmployee = new Employee(employee);

            updatedEmployee.save()
            .then(() =>{response.json('Employee updated!!')})
            .catch(err => response.status(400).json('Error: ' + err));
        }

    })
    .catch(err => response.status(400).json('Error: '+ err));
});


router.route('/getRepot/:username').get((request, response) =>{
    Employee.findOne({username: request.params.username})
    .then(employee => {
        if(employee != null){
            const employerArray = employee.employer;

            
            const hoursArray = [];
            employerArray.forEach(employer => {
                hoursArray.push(employer.hours);
            });

            // response.json(employerArray[0].hours);
            response.json(hoursArray);


        }
        else{
            response.json('Employee not found');

        }
     })
    .catch(() => response.status(400).json('Error: ' + err));
    
});

module.exports = router;