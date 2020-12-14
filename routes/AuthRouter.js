const express = require("express");
const { check } = require("express-validator");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

router.post(
    "/register",
    [
        check("password", "Please enter a password with 6 and more chars").isLength(
            {
                min: 6,
            }
        ),
        check("email", "Please enter a valid email!").isEmail(),
    ],
    AuthController.authRegister
);


router.post(
    "/login",
    [
        check("email", "Please enter a valid email!").isEmail(),
        check("password", "Please enter a password with 6 and more chars").isLength(
            {
                min: 6,
            }
        ),
    ],
    AuthController.authLogin
);

module.exports = router;