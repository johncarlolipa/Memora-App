const express = require("express");
const router = express.Router();
const  { getAllNotes, getSingleNote, createNote, updateNote, deleteNote} = require("../controller/noteController.js")

router.route("/").get(getAllNotes).post(createNote);
router.route("/:id").get(getSingleNote).put(updateNote).delete(deleteNote);

module.exports = router;