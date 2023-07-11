const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');


// get all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id;
    // find({}) would return all workouts; find({reps: 20}) would find all workouts that satisify reps == 20
    const workouts = await Workout.find({user_id}).sort({createAt: -1, _id: -1});

    res.status(200).json(workouts);
}


// get a single workout
const getWorkout = async (req, res) => {
    const {id} = req.params;

    // check if id is valid 
    if (!mongoose.Types.ObjectId.isValid(id)){
        // the point of return here is to stop running the code below
        return res.status(404).json({error: 'No such workout'});
    }

    const workout = await Workout.findById(id);

    if (!workout){
        return res.status(404).json({error: 'No such workout'});
    }
    res.status(200).json(workout);
}


// create a new workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body; // from user
    
    // add to db
    try {
        const user_id = req.user._id;
        const workout = await Workout.create( {title, reps, load, user_id} );
        res.status(200).json(workout) // send to client
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'});
    }
    
    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout){
        return res.status(404).json({error: 'No such workout'});
    }
    res.status(200).json(workout);
}


// update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'});
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body  // spread the properities of the object
    }, {new: true}) // The third argument will give the updated document as the response

    if (!workout){
        return res.status(404).json({error: 'No such workout'});
    }
    res.status(200).json(workout);
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
};