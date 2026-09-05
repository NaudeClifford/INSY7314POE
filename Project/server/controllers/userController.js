const User = require("../models/User");


// GET ALL USERS
const getUsers = async (req, res, next) => {
    try {

        const users = await User.find();

        res.json(users);

    } catch (error) {

        next(error);

    }
};


// CREATE USER
const createUser = async (req, res, next) => {

    try {

        const user = new User(req.body);

        const savedUser = await user.save();

        res.status(201).json(savedUser);


    } catch(error){

        next(error);

    }

};


module.exports = {
    getUsers,
    createUser
};
