const { Router } = require('express');
const router = Router();

const {
	renderNoteForm,
	createNewNote,
	renderNotes,
	renderEditForm,
	updateNote,
	deleteNote
} = require('../controllers/notes.controller');

const { isAuthenticated } = require('../helpers/auth');

// New note
router.get('/notes/add', isAuthenticated, renderNoteForm);

router.post('/notes/new-note', isAuthenticated, createNewNote);

// Get all notes
router.get('/notes', isAuthenticated, renderNotes);

// Edit note
router.get('/notes/edit/:id', renderEditForm);

router.put('/notes/edit-note/:id', updateNote);

// Delete note
router.delete('/notes/delete/:id', deleteNote);

module.exports = router;
