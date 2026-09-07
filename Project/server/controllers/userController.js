const User = require("../models/User");
const bcrypt = require("bcryptjs");


// GET ALL USERS
const getUsers = async (req, res, next) => {
    try {

        const users = await User.find()
        .select("_id name email role createdAt");


        res.json(users);

    } catch (error) {

        next(error);

    }
};


// CREATE USER
const createUser = async (req, res, next) => {

    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword
    });

        const savedUser = await user.save();

            res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      createdAt: savedUser.createdAt});


    } catch(error){

        next(error);

    }

};


module.exports = {
    getUsers,
    createUser
};
