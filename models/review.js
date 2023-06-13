const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number,
});

//many Reviews to one campground so a one to many relationship.
module.exports= mongoose.model("Review", reviewSchema);
