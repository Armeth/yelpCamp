const express = require('express');
const router = express.Router({mergeParams: true});
//expressRouter likes to keep ids separate --> thus mergeParams: true as an option
const catchAsync = require('../utils/catchAsync');
const {validateReview} = require('../middleware')
const Campground = require('../models/campground');
const Review = require('../models/review');

router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Review created! Thank you!')
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    //this req.params can be deconstructed into const {id, reviewId} = req.params.
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Campground review deleted');
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;