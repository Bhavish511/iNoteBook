const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const decode = require("../middleware/decode");
require("dotenv").config();

// Route 1: Create a User using: POST "/api/auth/". No login required
router.post(
  "/createuser",
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
        let pass = bcrypt.hashSync(password, 10);
        const newUser = new User({
          name,
          email,
          password: pass,
        });
        newUser
          .save()
          .then((user) => {
            res.json({
              message: "User created successfully",
              status: true,
              user: newUser,
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

router.post("/login", 
    [body("email", "Enter a valid email").isEmail(),
     body("password","Password can not be empty").exists()  
    ],
    (req, res) => {
        const { email, password } = req.body;
        console.log(req.body);
        User.findOne({ email: email }).then((user) => {
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            } else {
                const passwordCompare = bcrypt.compareSync(password, user.password);
                if (!passwordCompare) {
                    return res.status(400).json({ error: "Please try to login with correct credentials" });
                } else {
                    // send JWT token here
                    const data = {
                        user: {
                            id: user.id,
                            email: user.email,
                        }
                    };
                    const token = jwt.sign(data, process.env.JWT_SECRET);
                    res.json({ message: "Login successful", status: true, token });
                }
            };
        });
    }
);

// Get User Information
router.get("/getuser", decode , async (req,res) => {
    try {
        // console.log("getuser");
        const user = req.user;
        // console.log(user.id);
        const userId = user.id;
        const data = await User.findById(userId).select('-password ');
        // console.log(data);
        res.json({ message: "Login successful", status:true, user:data });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;
