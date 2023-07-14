const mongoose = require('mongoose');
const cities = require('./cities');
const axi = require('axios');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
const { default: axios } = require('axios');

main().catch(err => console.log(err));

async function main() {
    await
    mongoose.set('strictQuery', false);
    mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      console.log("Open")})
      .catch(err => {
          console.log("ERROR")
          console.log(err);
      })
    };


const sample = array => array[Math.floor(Math.random() * array.length)];

async function seedImg() {
    try {
        const resp = await axi.get('https://api.unsplash.com/photos/random', {
            params: {
                client_id: 'evPTCtyBqCtR1XYSl8d0xMgVlp3ZyuZ8aidFbU-Zuxg',
                collections: 1114848,
            }
        })
        return resp.data.urls.small
    } catch (err) {
        console.error(err)
    }
}
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 15) + 10;
        const camp = new Campground({
            author: '64af1c96facc26f9c8ecc173', //Lorsai username
            imageUrl: await seedImg(),
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut dolorum repellendus, aliquid explicabo consequuntur asperiores et omnis animi culpa. Tempore modi, ipsa perspiciatis quidem dolorum minus aliquid nisi voluptate quas!",
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})