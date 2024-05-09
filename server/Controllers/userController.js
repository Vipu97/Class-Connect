const express = require('express');
const User = require('../Models/User');
const router = express.Router();

//route to create a new user
router.post('/', async (req, res) => {
    try {
        const { email, name, _id, emailVerified } = req.body;
        let user = await User.exists({email});
        if(user){
            user = await User.findOneAndUpdate({email} , {$set : {emailVerified}});
        }
        else{
            user = await User.create({email,name,_id,emailVerified});
            user.save();
        }
        res.status(201).json(user);

    } catch (err) {
        res.status(422).json(err.message);
    }
})

//route to delete user
router.delete("/:email", async (req, res) => {
    try {
        const { email } = req.params;
        await User.findOneAndDelete({ email })
    } catch (err) {
        res.status(500).json("Error while deleting user");
    }
})

//route to check whether a user exist or not

router.get("/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.exists({ email });
        res.json(user);
    } catch (err) {
        res.status(422).json(err);
    }
})

//route to fetch user details by id
router.get("/id/:id" , async(req,res)  => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err.message);
    }
})

//route to update User Profile
router.put("/" , async (req,res) => {
    try{
        const {id,name,phone,instituteName,country} = req.body;
        const user = await User.findByIdAndUpdate(id , {name,phone,instituteName,country});
        res.status(201).json(user);
    }catch(err){
        res.status(500).json(err.message);
    }
})



module.exports = router;
