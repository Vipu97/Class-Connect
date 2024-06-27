const express = require('express');
const Event = require("../Models/Event");
const router = express.Router();
const {generateEventCode} = require("../utils/helper");

//route to create new event
router.post("/", async(req,res) => {
    try{
        const {userId} = req.body;
        const randomCode = generateEventCode(); 
        const event = await Event.create({eventCode : randomCode , organiser : userId , date : Date.now()});
        res.status(201).json(event);
    }catch(err){
        res.status(422).json(err.message);
    }
})

//route to fetch event details by event code
router.get("/:eventCode",async(req,res) => {
    try{
        const {eventCode} = req.params;
        const event = await Event.findOne({eventCode});
        res.status(200).json(event);
    }catch(err){
        res.status(500).json(err.message);
    }
})

//route to update event name
router.put("/eventName",async(req,res) => {
    try{
        const {newEventName,eventCode} = req.body;
        const event = await Event.findOneAndUpdate({eventCode},
        {name:newEventName});
        res.status(200).json(event);
    }catch(err){
        res.status(500).json(err.message);
    }
})


//route to fetch all events hosted by user
router.get("/user/:userId" , async(req,res) => {
    try{
        const {userId} = req.params;
        const events = await Event.find({organiser:userId});
        res.status(200).json(events); 
    }catch(err){
        res.status(500).json(err.message);
    }
})

//route to delete a event 
router.delete("/:eventId", async(req,res) => {
    try{
        const {eventId} = req.params;
        await Event.findByIdAndDelete(eventId);
        res.status(200).json("Event Deleted");

    }catch(err){
        res.status(500).json(err.message);
    }
})

//route to accept response from user
router.post('/response',async(req,res) => {
    try{
        const {userId,response,code,userName} = req.body;
        const foundEvent = await Event.findOne({eventCode : code});
        foundEvent.responses.push({userId,response,userName});
        await foundEvent.save();
        res.status(201).json("Response Submitted Sucessfully");

    }catch(err){
        res.status(422).json(err.message);
    }
})

//route to check whether a reponse already submitted by a user
router.get('/submit/isSubmitted' , async(req,res) => {
    try{
        const {code,userId} = req.query;
        const event = await Event.findOne({eventCode:code});
        for(let i of event.responses){
            if(userId.toString() == i.userId)
                return res.status(200).json({message : "Response Already Submitted"});
        }
        res.status(404).json("Reponse Not Submitted");
    }catch(err){
        res.status(500).json(err.message);
    }
})

//route to reset event
router.delete('/reset/:eventCode' , async(req,res) => {
    try{
        const {eventCode} = req.params;
        const event = await Event.findOne({eventCode});
        event.responses = [];
        await event.save();
        res.status(201).json("Event Reset Successfully");
    }catch(err){
        res.status(500).json(err.message);
    }
})
module.exports = router;