const User = require("../models/UserModel");
const { validationResult } = require("express-validator");

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

    // Save User
  const user = new User({
    name,
    email,
    password,
  });
  await user.save();

  //TODO: Error handling for saving
  res.send("Register Completed.");
};