const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

// CREATE: Add a note (Protected)
router.post('/', auth, async (req, res) => {
  try {
    const newNote = new Note({
      ...req.body,
      user: req.user.id // Extracted from verified JWT
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Fetch all notes belonging exclusively to the logged-in user (Protected)
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Modify a user's own note (Protected)
router.put('/:id', auth, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    // Validate ownership before altering data
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User unauthorized to update this note' });
    }

    note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Remove a user's own note (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    // Validate ownership before removing data
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User unauthorized to delete this note' });
    }

    await note.deleteOne();
    res.status(200).json({ message: 'Note removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
