const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    imageUrl: String,
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    //need to store the review ids in the campground model
    //ref is the review model; an object ID from a "Review" model.
    //route to be defined and a form for a new review.
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if(doc){
        await Review.deleteMany({_id: {
            $in: doc.reviews
        }})
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);