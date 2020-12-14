const User = require("../models/UserModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.authRegister = async (req, res) => {
    const { name, email, password } = req.body;

    // Field Validation
    const validationErr = validationResult(req);
    if (validationErr.errors.length > 0) {
        return res.status(400).json({ errors: validationErr.array() });
    }

    // User exist check
    const userData = await User.findOne({ email });
    if (userData) {
        return res
            .status(400)
            .json({ errors: [{ message: "User already exists!!" }] });
    }

    //Hash password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Save User
    const user = new User({
        name,
        email,
        password: hashPassword
    });
    await user.save();

    //TODO: Error handling for saving
    res.send("Register Completed.");
};

exports.authLogin = async (req, res) => {
    const { email, password } = req.body;

    // Field Validation
    const validationErr = validationResult(req);
    if (validationErr.errors.length > 0) {
        return res.status(400).json({ errors: validationErr.array() });
    }

    // User exist check
    const userData = await User.findOne({ email });
    if (!userData) {
        return res
            .status(400)
            .json({ errors: [{ message: "User doesn't exists!!" }] });
    }

    // Password compare
    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    if (!isPasswordMatch) {
        return res
            .status(400)
            .json({ errors: [{ message: "Invalid credentials" }] });
    }
};