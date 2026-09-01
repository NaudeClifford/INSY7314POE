const express = require("express");

const router = express.Router();

const {
    getUsers,
    createUser
} = require("../controllers/userController");


// GET USERS
router.get("/", getUsers);


// CREATE USER
router.post("/", createUser);


module.exports = router;