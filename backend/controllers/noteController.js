const noteModel = require('../models/noteModel');
const mongoose = require('mongoose');


const createNote = async (req, res) => {
    const { title, desc } = req.body;

    try {
        const note = await noteModel.create({title, desc});
        res.status(200).json(note);
    } catch (error) {
        res.status(400).json({err: error.message});
    }
}

const getNotes = async (req, res) => {
    const notes = await noteModel.find().sort({
        createdAt: -1
    });

    res.status(200).json(notes);
}

const getNote = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'invalid ID'})        
    }

    const note = await noteModel.findById(id);

    if (!note) {
        return res.status(404).json({err: "Note not found"})
    }

    res.status(200).json(note);
}

const deleteNote = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'invalid ID'})        
    }

    const note = await noteModel.findOneAndDelete({_id:id});

    if (!note) {
        return res.status(404).json({err: "Note not found"})
    }

    res.status(200).json(note);
}

const updateNote = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'invalid ID'})        
    }

    const note = await noteModel.findOneAndUpdate({_id:id}, {
        ...req.body
    }, {new: true});

    if (!note) {
        return res.status(404).json({err: "Note not found"})
    }

    res.status(200).json(note);
}


module.exports = {
    createNote, getNotes, getNote, deleteNote, updateNote
}
