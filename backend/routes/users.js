const router = require('express').Router();
let User = require('../models/user.model');

// get all the Users
router.route('/').get((request, response) =>{
    User.find()
    .then(users => response.json(users))
    .catch(err => response.status(400).json('Error: '+ err));
});

// Add new User
router.route('/add').post((request, response) =>{
    const username = request.body.username;
    const password = request.body.password;


    const newUser = new User({username, password});

    newUser.save()
    .then(()=> response.json('User added!'))
    .catch(() => response.status(400).json('Error: ' + err));
});

// get User by username
router.route('/:username').get((request, response) =>{
    User.findOne({username: request.params.username})
    .then(user => response.json(user))
    .catch(() => response.status(400).json('Error: ' + err));

})


module.exports = router;

