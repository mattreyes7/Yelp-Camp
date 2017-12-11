const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// SCHEMA SET UP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Widows Peak",
//     image:"https://farm7.staticflickr.com/6191/6093778029_80248222df.jpg",
//     description: "super cool peak for widows"
// }, function(err, campground){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("new campground!");
//     console.log(campground);
//   }
// })

// var campgrounds = [
//   {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4016/4270995674_9fd4546267.jpg"},
//   {name: "Widows Peak", image: "https://farm7.staticflickr.com/6191/6093778029_80248222df.jpg"},
//   {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4016/4270995674_9fd4546267.jpg"},
//   {name: "Widows Peak", image: "https://farm7.staticflickr.com/6191/6093778029_80248222df.jpg"},
//   {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4016/4270995674_9fd4546267.jpg"},
//   {name: "Widows Peak", image: "https://farm7.staticflickr.com/6191/6093778029_80248222df.jpg"},
//   {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4016/4270995674_9fd4546267.jpg"},
//   {name: "Widows Peak", image: "https://farm7.staticflickr.com/6191/6093778029_80248222df.jpg"},
//   {name: "Cow's Ridge", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}
// ]

// ROUTES are below

app.get('/', function(req, res){
  res.render('landing')
})

// INDEX route -- shows all campgrounds
app.get('/campgrounds', function(req, res){
  // Get all campgrounds from DB
  Campground.find({}, function(err, allcampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("index", {campgrounds:allcampgrounds});
    }
  });
});

// CREATE route ----- making new campgrounds
app.post('/campgrounds', function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc}
  // Create a new campground and save to database
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      // redirect to campgrounds page
      res.redirect('/campgrounds');
    }
  })
});

// NEW route that shows form and sends data to post route
app.get('/campgrounds/new', function(req, res){
  res.render('new')
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
  // find the campground with the provided id
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      // render show template with that campground
      res.render("show", {campground: foundCampground});
    }
  });
});

app.listen(3000, function(){
  console.log('listening');
});
