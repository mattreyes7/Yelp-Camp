const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var campgrounds = [
  {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4016/4270995674_9fd4546267.jpg"},
  {name: "Widows Peak", image: "https://farm7.staticflickr.com/6191/6093778029_80248222df.jpg"},
  {name: "Cow's Ridge", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}
]

app.get('/', function(req, res){
  res.render('landing')
})

// shows all campgrounds
app.get('/campgrounds', function(req, res){
  res.render('campgrounds',{campgrounds:campgrounds});
});

// making new campgrounds
app.post('/campgrounds', function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image}
  campgrounds.push(newCampground);
  // redirect to campgrounds page
  res.redirect('/campgrounds')
});

// route that shows form and sends data to post route
app.get('/campgrounds/new', function(req, res){
  res.render('new')
});

app.listen(3000, function(){
  console.log('listening');
});
