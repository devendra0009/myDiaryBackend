//oncalling notes.js endpoint what it should show
//to agr authentication successfull hoti hai to hme us user k coresponding vale notes show krne hai
//so maybe notes ko bhi connect krna pdega specific user se ,let's see

const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();

//Router 1: router to fetch all the notes linked with the given user id
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id }); //req me hmara user hai bcz in fetchUser hmne req.user export krwaya hai therefore uski id accesible hai
  res.json(notes); //ab mne notes vale array ko res m bhej dia
});

//Router 2:router to add the note use POST method to add the note linking to the same user who is logged in
router.post(
  "/addnote",
  fetchUser, //to get the user id which had logged in and link it with the added note
  [
    body("title", "Enter the valid title").isLength({ min: 3 }),
    body("description", "Enter the valid title").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // console.log(req.body); //req.body to hm input lege idhr

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;
    try {
      const note = await Notes.create({
        // title: req.body.title,  //req.body is inputted by us remember that-->  dont need this syntax now since mne phle hi destructure krlia hai
        title,
        description,
        tag,
        user: req.user.id,
        //ye to bhai most important hai dena taki pta chhle ki hme kis user k notes chiye and req.user.id is coming from fetch user which converting the auth token to the user details
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (err) {
      // console.log(err.message);
      res.status(500).send("Internal Server error occured!!");
    }
  }
);

//Router 3: router to update notes, we use PUT method, login required

router.put("/update/:id", fetchUser, async (req, res) => {
  //destructure the updated values given to res
  const { title, description, tag } = req.body;

  try {
    //make a new note and put the destuctured values there and we will replace it with the old one
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //now we have to just bring the existing note here using the id and with some checks, update it
    let note = await Notes.findById(req.params.id);

    //check if the note is existing or not
    if (!note) {
      return res.status(404).send("Note not existing");
    }

    //if the note is linked to correct user check
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed!!");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.send({ note });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server error occured!!");
  }
});

//Router 4: router to delete notes, we use DELETE method, login required
//Similar to update notes

router.delete("/delete/:id", fetchUser, async (req, res) => {

  //here in delete we just have to verify person tryinig to delete it is the same person which had created this note

  try {
    //now we have to just bring the existing note here using the id and with some checks and delete it
    let note = await Notes.findById(req.params.id);

    //check: if the note is existing or not
    if (!note) {
      return res.status(404).send("Note not existing");
    }

    //check: if the note is linked to correct user
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed!!");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.send({ Success: "Note has been deleted", note: note });
  } catch (err) {
    // console.log(err.message);
    res.status(500).send("Internal Server error occured!!");
  }
});

module.exports = router;
