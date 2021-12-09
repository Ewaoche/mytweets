const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Tweet = require('../models/Tweet');
const uuid = require('uuid');



//@desc   Create Tweet
//route POST /api/v1/CreateTweet
// Access Private

const CreateTweet = asyncHandler(async(req, res, next) => {

    //add user to req body
    req.body.user = req.user.id;

    const tweet = await Tweet.create(req.body);

    if (tweet) {
        res.status(200).json({
            message: ' tweet was created successfully',
            data: tweet
        });
    }
});


const getAllTweets = asyncHandler(async(req, res, next) => {

    const Alltweet = await Tweet.find();
    if (Alltweet) {
        res.status(200).json({
            message: 'successfully retrived',
            Alltweet
        });
    }
});


const getTweetById = asyncHandler(async(req, res, next) => {
    const tweet = await Tweet.findById(req.params.id).populate({
        path: 'user',
        select: 'name'
    });
    if (tweet) {
        res.status(200).json({
            message: 'successfully retrived',
            tweet
        });
    }
});

const getOwnersTweet = asyncHandler(async(req, res, next) => {
    const AllOwnerTweet = await Tweet.find({ user: req.user.id });
    if (AllOwnerTweet) {
        res.status(200).json({
            message: 'successfully retrived',
            AllOwnerTweet
        });
    }
});

const updateTweet = asyncHandler(async(req, res, next) => {

    let gettweet = await Tweet.findById(req.params.id);

    if (!gettweet) {
        return next(new ErrorResponse(`No Tweet with the id of ${req.params.id}`, 404));
    }


    const updatefield = {
        comment: req.body.comment,

    };


    comment_genId = uuid.v4();
    // const arrcomment = { comment: req.body.comment, comment_genId };

    let id = req.params.id;
    const comment = await Tweet.updateOne({ _id: id }, { $push: { "comments": updatefield } });
    if (comment) {
        res.send({
            message: 'comment added',
            comment_genId: comment_genId,
        });
    }

    // tweet = await Tweet.findByIdAndUpdate(req.params.id, updatefield, {
    //     new: true,
    //     runValidators: true
    // });

    // if (tweet) {
    //     res.status(200).json({
    //         success: true,
    //         data: tweet
    //     })
    else {
        return next(new ErrorResponse(`Tweet with the id of ${req.params.id} could not be updated`, 500));

    }



});




//@desc   DELETE  Tweet
//route DELETE /api/v1/deleteTweet/:id
// Access Private

const deleteTweet = asyncHandler(async(req, res, next) => {

    const getTweet = await Tweet.findById(req.params.id);

    if (!getTweet) {
        return next(new ErrorResponse(`No Tweet with the id of ${req.params.id}`, 404));
    }

    //Make sure user is the Course owner
    if (getTweet.user.toString() !== req.user.id && req.user.role !== 'admin') {

        return next(
            new ErrorResponse(`User with  ${req.user.id} is not authorized to delete a Tweet  except the Tweet owner`, 401)
        );
    }

    await Tweet.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        data: {}
    })

})

module.exports = {
    CreateTweet,
    getAllTweets,
    getOwnersTweet,
    getTweetById,
    deleteTweet,
    updateTweet
}