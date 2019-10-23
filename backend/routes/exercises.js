const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((request, response) => {
    Exercise.find()
    .then(exercises => response.json(exercises))
    .catch(err => response.status(400).json('Error: ' + err));
});

router.route('/add').post((request, response) => {
    const username = request.body.username;
    const description = request.body.description;
    const duration = Number(request.body.duration);
    const date = Date.parse(request.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
    .then(() => response.json('Exercise added!'))
    .catch(err => response.status(400).json('Error: ' + err));
});

router.route('/:id').get((request, response) =>{
    Exercise.findById(request.params.id)
    .then(exercise => response.json(exercise))
    .catch(err => response.status(400).json("Error: " + err));
});

router.route('/:id').delete((request, response) => {
    Exercise.findByIdAndDelete(request.params.id)
    .then(response.json('Exercise deleted.'))
    .catch(err => response.status(400).json("Error: " + err));
});

router.route('/update/:id').post((req, res) =>{
    Exercise.findById(req.params.id)
    .then( exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = req.body.duration;
        exercise.date = req.body.date;

        exercise.save()
        .then(res.json("Exercise update!"))
        .catch(err => response.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;