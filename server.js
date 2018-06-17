var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect('mongodb://vaibhavahuja:vaibhavahuja1@ds263460.mlab.com:63460/display-content', function(err,client){
  if(err) return (console.log(err));
  db = client.db('display-content');

  app.listen(process.env.PORT || 3000, function(){
    console.log("listening on ");
  })
})

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');


app.get('/', (req,res)=>{
  db.collection('content').find().toArray(function(err,result){
    if(err) return console.log(err);

    res.render('index.ejs', {content: result});
  })
})


app.get('/data', (req,res)=>{
  db.collection('content').find().toArray(function(err,result){
    if(err) return console.log(err);

    res.render('content.ejs', {content: result});
  })
})

app.get('/speed', function(req,res){
  db.collection('content').find().toArray(function(err,result){
    if(err) return console.log(err);

    res.render('speed.ejs', {content: result});
  })
})

app.post('/quotes', function(req,res){
  db.collection('content').save(req.body, function(err,result){
    if (err) return console.log(err);

    console.log('saved to database');
    res.redirect('/');
  })
})
