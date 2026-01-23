const express = require("express");
const router = express.Router();
const decode = require("../middleware/decode");
const Notes = require("../models/Notes");
const { body } = require("express-validator");
const mongoose = require("mongoose");
// Route 1: Create a User using: POST "/api/auth/". No login required
router.post("/addnote", decode,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description must be atleast 5 charactors').isLength({min:5})
], 
async (req, res) => {
    try {
        const {title,description,tag} = req.body;
        const userId = req.user.id;
        const note = new Notes({
            user: userId,
            title: title,
            description: description,
            tag: tag,
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

// update an existing note

router.put("/updatenote/:id",decode, [ 
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description must be atleast 5 charactors').isLength({min:5})
],
async (req, res)=>{
    try {
        const {title,description,tag} = req.body;
        const id = req.params.id;
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        
        const updated = await Notes.findByIdAndUpdate(

            id,
            { $set: newNote },
            { new: true }
        );        
        res.json({
        message: "Notes fetched Successfully",
        success: true,
        data:updated,
    });
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
    
}
});

router.delete("/deletenote/:id", decode, async (req, res) => {
  try {
    const id = req.params.id;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid note ID" });
    }

    const note = await Notes.findById(id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // ✅ Ownership check
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Allowed" });
    }

    await Notes.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Note deleted successfully",
      data: note,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;