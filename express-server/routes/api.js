const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const dbHost = 'mongodb://database/mean-docker';

mongoose.connect(dbHost);

//create mongoose schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});
  
const User = mongoose.model('User', userSchema);

// Get api listing
router.get('/', (req, res) => {
    res.send('api works');
});

// Get all users
router.get('/users', (req, res) => {
    User.find({}, (err, users) =>{
        if (err) res.status(500).send(error)
        res.status(200).json(users);
        console.log('Finding users 2...');
    });
});


// Get a user by id
router.get('/users/:id', (req, res) => {
    User.findById(req.param.id, (err, users) => {
        if (err) res.status(500).send(error)
        res.status(200).json(users);
    });
});


//Create a user
router.post('/users', (req, res) => {
    let user = new User({
        name: req.body.name,
        age: req.body.age
    });

    user.save(error => {
        if (error) res.status(500).send(error);
        res.status(201).json({
            message: 'User created successfully'
        });
    });
});

      
module.exports = router;
