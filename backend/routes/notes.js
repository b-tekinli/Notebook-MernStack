const express = require('express');
const { createNote, getNotes, getNote, deleteNote, updateNote } = require('../controllers/noteController');

const router = express.Router();

router.get('/', getNotes);

// list
router.get('/:id', getNote);

// add 
router.post('/', createNote);

// delete
router.delete('/:id', deleteNote);

// update
router.patch('/:id', updateNote);

module.exports = router;
