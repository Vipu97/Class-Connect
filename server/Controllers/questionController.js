const express = require('express');
const Question = require('../Models/Question');
const {shuffleArray} = require("../utils/helper");

const router = express.Router();

//route to create new question
router.post('/', async (req, res) => {
    try {
        let { question, answers, eventCode, type, options,photos } = req.body;
        if(type === "sorting")
           options = shuffleArray([...answers]);
        const newQuestion = await Question.create({ type, question, answers, eventCode, options,photos });
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(422).json(err.message);
    }
})

//route to fetch all questions by event code
router.get('/code/:eventCode', async (req, res) => {
    try {
        const { eventCode } = req.params;
        const questions = await Question.find({ eventCode });
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json(err.message);
    }
})

//route to fetch question details by id
router.get("/:questId", async (req, res) => {
    try {
        const { questId } = req.params;
        const question = await Question.findById(questId);
        res.status(200).json(question);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
})

//route to update existing question
router.put('/', async (req, res) => {
    try {
        let { id, question, answers, eventCode, type, options,photos } = req.body;
        if(type === "sorting")
           options = shuffleArray([...answers]);
        const updatedQuestion = await Question.findByIdAndUpdate(id, {
            question, answers, eventCode, type, options,photos
        })
        res.status(201).json(updatedQuestion);
    } catch (err) {
        res.status(422).json(err.message);
    }
})

//route to delete question by id
router.delete('/:questId', async (req, res) => {
    try {
        const { questId } = req.params;
        await Question.findByIdAndDelete(questId);
        res.status(200).json("Question Deleted Successfully")
    } catch (err) {
        res.status(500).json(err.message);
    }
})

//route to delete all questions of a event 
router.delete("/event/:eventCode", async (req, res) => {
    try {
        const { eventCode } = req.params;
        await Question.findOneAndDelete({ eventCode });
        res.status(200).json("All question Deleted for the event")
    } catch (err) {
        res.status(500).json(err.message);
    }
})


module.exports = router;