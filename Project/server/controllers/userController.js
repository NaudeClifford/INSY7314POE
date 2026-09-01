const User = require("../models/User");


// GET ALL USERS
const getUsers = async (req, res) => {
    try {

        const users = await User.find();

        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// CREATE USER
const createUser = async (req, res) => {

    try {

        const user = new User(req.body);

        const savedUser = await user.save();

        res.status(201).json(savedUser);


    } catch(error){

        res.status(400).json({
            message:error.message
        });

    }

};


module.exports = {
    getUsers,
    createUser
};