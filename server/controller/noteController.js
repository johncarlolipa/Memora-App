const Notes = require("../models/Notes");

// GET ALL
const getAllNotes = async (req, res) => {
    try {
      const user_id = req.user._id;
      const data = await Notes.find({ user_id });
      if (!data) {
        throw new Error("An error occured while fetching notes...");
      }
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "An error occured while fetching notes..." });
    }
  };

  // GET SINGLE NOTE
  const getSingleNote =  async (req, res) => {
    try {
      const noteID = req.params.id;
      const data = await Notes.findById(noteID);
      if (!data) {
        throw new Error("Note not found");
      }
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Note not found" });
    }
  };

  // CREATE NOTE
const createNote = async (req, res) => {
    try {
      const user_id = req.user._id;
      const { title, description } = req.body;
      const data = await Notes.create({ title, description, user_id });
      if (!data) {
        throw new Error("An error occured while creating note...");
      }
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "An error occured while creating note..." });
    }
  };

  // UPDATE NOTE
 const updateNote = async (req, res) => {
    try {
      const noteID = req.params.id;
      const { title, description } = req.body;
      const data = await Notes.findByIdAndUpdate(noteID, { title, description });
      if (!data) {
        throw new Error("Error occured while updating note");
      }
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error occured while updating note" });
    }
  };

  // DELETE NOTE
const deleteNote =  async (req, res) => {
    try {
      const noteID = req.params.id;
      const data = await Notes.findByIdAndDelete(noteID);
      if (!data) {
        throw new Error("Error occured while deleting note");
      }
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error occured while deleting note" });
    }
  };

  module.exports = { getAllNotes, getSingleNote, createNote, updateNote, deleteNote};