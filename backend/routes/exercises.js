const router = require('express').Router()
let Exercise = require('../models/exercise.model.js')

//router.route allows you to use multiple methods at the same time. If not, I have to use router.get, router.put separately
router.route('/').get((req,res) => {
    Exercise.find()
//how does the results of .find go into the argument of then.?
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req,res) => {
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date(req.body.date)
    const newExercise = new Exercise({username, description, duration, date})

    newExercise.save() 
        .then(() => res.json("Exercise Added"))
        .catch(error => res.status(400).json("Error: " + error))
})

router.route('/:id')
.get((req,res) => {
    Exercise.findById(req.params.id) 
        .then(exercise => res.json(exercise))
        .catch(error => res.status(400).json("Error: " + error))
})
.delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise Deleted'))
        .catch( error => res.status(400).json("Error: " + error))
})


// How can I use put here instead?
router.route('/update/:id')
.post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username
            exercise.description = req.body.description
            exercise.duration = req.body.duration
            exercise.date = req.body.date
            exercise.save()
                .then(() => {res.json("Exercise Updated!")})
                .catch(error => res.status(400).json("Error: " + error))     
        })
        .catch(error => res.status(400).json("Error: " + error))
})

//What is the correct way to handle errors? how can I change error handling to a separate middleware at the end?
//Order of execution of middleware (including get post etc and use and all)
//replace post with put for final one

module.exports = router