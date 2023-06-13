//Foundation code
const express = require("express")
const path = require('path')
const mongoose = require('mongoose');
const engine = require('ejs-mate');

const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/reviews');

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

const app = express()

app.engine('ejs', engine); //ejs-mate
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)


app.get('/', (req, res) => {
    res.render('home')
});


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const {statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, Something Went Wrong'
    res.status(statusCode).render('error', { err })
    
})

app.listen(3000, () => {
    console.log("serving port 3000");
})
//foundation code
