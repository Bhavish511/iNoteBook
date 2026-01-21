const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body } = require("express-validator");
// Route 1: Create a User using: POST "/api/auth/". No login required
router.post(
  "/",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    // Check whether the user with this email exists already
    User.findOne({ email: email }).then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        newUser
          .save()
          .then((user) => {
            res.json({
              message: "User created successfully",
              status: true,
              user:newUser,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
          });
      }
    });
  },
);

module.exports = router;
