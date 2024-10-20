const Note = require("../models/note.model");

const addNote = async(req,res)=>{
    try {
        const token = req.user;
        const {title,content} = req.body

        const newNote = new Note({
            userId:token.id,
            title,
            content
        })

        const result = await newNote.save();
        return res.status(200).json({
            message:"note added successfully",
            note:result
        })
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const updateNote = async(req,res)=>{
    try {
        const {id} = req.params;
        const {title,content} = req.body;

        const note = await Note.findById(id);
        if(!note){
            return res.status(400).send({message:"note with this is not available"});
        }

        const updateNote = {
            title,
            content
        }

        const updatedNote = await Note.findByIdAndUpdate(id,updateNote,{new:true});

        const result = await updatedNote.save();
        return res.status(200).json({
            message:"note updated successfully",
            note:result
        })
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const getNote = async(req,res)=>{
    try {
        const token = req.user;

        const notes = await Note.find({userId:token.id});
        if(!notes){
            return res.status(400).send({message:"no any note available within this user"});
        }
        return res.status(200).json({
            message:"notes retrive successfully",
            notes:notes
        })
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const deleteNote = async(req,res)=>{
    try {
        const {id} = req.params;

        const note = await Note.findByIdAndDelete(id);
        if(!note){
            return res.status(400).send({messagge:"no any node availabl within this user"});
        }
        return res.status(200).json({
            message:"note deleted successfully",
            note:note
        })
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

module.exports = {
    addNote,
    updateNote,
    getNote,
    deleteNote
}