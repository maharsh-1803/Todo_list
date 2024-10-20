const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    }
})

const Note = mongoose.model('Note',noteSchema);

module.exports = Note;