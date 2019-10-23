const router = require('express').Router();
let Company = require('../models/company.model');

// get all the Companys
router.route('/').get((request, response) =>{
    Company.find()
    .then(Company => response.json(Company))
    .catch(err => response.status(400).json('Error: '+ err));
});

router.route('/addNewCompany').post((request, response) => {
    Company.findOne({company: request.body.company})
    .then(company =>{ 
            if(company != null){
                response.json('Company already exsist!');
            }
            else{
                const company = request.body.company;
                const newCompany = new Company({company});


                newCompany.save()
                .then(() => response.json('New company saved!'))
                .catch(err => response.status(400).json('Error0: ' + err));
            }
       
    })
    .catch(err => response.json('Error1: ' + err));
 
});

router.route('/addNewProfession').post((request, response) => {
    Company.findOne({company: request.body.company})
    .then(company => {
        const professionsArray = company.professions;

        const result = professionsArray.find( ({ profession }) => profession === request.body.profession);

        if(result != null){ //Profession already exist 
            response.json('Profession already exist');
        }
        else
        {
        const professionFromBody = request.body.profession;
        const payPerHourFromBody = request.body.pay;

        const newProfession ={
            profession : professionFromBody,
            pay: payPerHourFromBody,
        };

      
        professionsArray.push(newProfession);

        const updatedCompany = new Company(company);

        updatedCompany.save()
        .then(response.json('New profession added!'))
        .catch(err => response.status(400).json('Error: ' + err));
    }

    })
    .catch(err => response.status(400).json('Error: ' + err));
});

module.exports = router;