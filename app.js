const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('landing')
})

app.get('/campgrounds', function(req, res){
  var campgrounds = [
    {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4016/4270995674_9fd4546267.jpg"},
    {name: "Widows Peak", image: "https://farm7.staticflickr.com/6191/6093778029_80248222df.jpg"},
    {name: "Cow's Ridge", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}
  ]

  res.render('campgrounds',{campgrounds:campgrounds});
});

app.listen(3000, function(){
  console.log('listening');
});
