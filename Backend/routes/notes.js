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

router.delete("/deletenote/:id",decode, async(req, res)=>{
    try {
        const id = req.params.id;
        const note = await Notes.findById(id);
        if(note){
            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not Allowed");
            }else{
                await Notes.findByIdAndDelete(id);
                res.json({
                    message: "Notes deleted Successfully",
                    success: true,
                    data:note,
                });
            }
        }
        else {
            res.status(404).send("Note not found");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;