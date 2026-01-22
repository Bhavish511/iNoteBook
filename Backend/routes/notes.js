const express = require("express");
const router = express.Router();
const decode = require("../middleware/decode");
const Notes = require("../models/Notes");
const { body } = require("express-validator");
// Route 1: Create a User using: POST "/api/auth/". No login required
router.post("/addnote", decode,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description must be atleast 5 charactors').isLength({min:5})
], 
async (req, res) => {
  try {
    const userId = req.user.id;
    const note = new Notes({
      user: userId,
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
    });
    note.save().then(() => {
      res.json({
        message: "User created successfully",
        status: true,
        note: note,
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// Get Notes
router.get("/fetchallnotes", decode, async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await Notes.find({ user: userId });
    res.json({
      message: "Notes fetched Successfully",
      success: true,
      data,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;