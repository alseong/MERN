const router = require('express').Router()
let User = require('../models/user.model.js')

//router.route allows you to use multiple methods at the same time. If not, I have to use router.get, router.put separately
router.route('/').get((req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req,res) => {
    const username = req.body.username
    const newUser = new User({username})

    newUser.save() 
        .then(() => res.json("User Added"))
        .catch(err => res.status(400).json("Error: " + error))
})

module.exports = router