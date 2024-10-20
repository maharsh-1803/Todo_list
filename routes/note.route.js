const express = require('express');
const authToken = require('../middleware/authToken');
const { addNote, updateNote, getNote, deleteNote } = require('../controller/note.controller');
const router = express.Router();

router.post('/addNote',authToken,addNote);
router.put('/updateNote/:id',authToken,updateNote);
router.get('/getNote',authToken,getNote);
router.delete('/deleteNote/:id',authToken,deleteNote);

module.exports = router;