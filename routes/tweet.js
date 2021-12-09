const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');




const tweetsControllers = require('../controller/tweetsController');

router.post('/CreateTweet', protect, tweetsControllers.CreateTweet);
router.get('/getAllTweets', tweetsControllers.getAllTweets);
router.get('/getOwnersTweet', protect, tweetsControllers.getOwnersTweet);
router.get('/getTweetById/:id', protect, tweetsControllers.getTweetById);
router.delete('/deleteTweet/:id', protect, tweetsControllers.deleteTweet);
router.put('/updateTweet/:id', protect, tweetsControllers.updateTweet);


module.exports = router;