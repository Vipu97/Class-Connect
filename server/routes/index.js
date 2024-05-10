const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const eventController = require('../Controllers/eventController');
const questionController = require('../Controllers/questionController');
const multer = require('multer');
const uploadToS3 = require("../utils/uploadToS3");

router.use('/user', userController);
router.use('/event', eventController);
router.use('/question', questionController);

const upload = multer({ dest: '/tmp' });

//route to generate tokens for meeting
router.get("/get-token", (req, res) => {
  const API_KEY = process.env.VIDEOSDK_API_KEY;
  const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;

  const options = { expiresIn: "10m", algorithm: "HS256" };

  const { roomId, peerId } = req.body;

  let payload = {
    apikey: API_KEY,
    permissions: ["allow_join", "allow_mod"],
  };

  if (roomId || peerId) {
    payload.version = 2;
    payload.roles = ["rtc"];
  }
  if (roomId) {
    payload.roomId = roomId;
  }
  if (peerId) {
    payload.participantId = peerId;
  }

  const token = jwt.sign(payload, SECRET_KEY, options);
  res.json({ token });
});


//route to handle photo upload
router.post("/slide/upload" , upload.single('photo'), async (req,res) => {
  try{
    const { path, originalname,mimetype } = req.file;
    const url = await uploadToS3(path,originalname,mimetype);
    res.status(201).json(url);
  }catch(err){
    res.status(500).json(err.message);
  }
})

module.exports = router;