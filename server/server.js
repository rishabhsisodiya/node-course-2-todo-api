const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');

const {User} = require('./models/user');
const {Todo} = require('./models/todo');

var app=express();

app.use(bodyParser.json());

app.post('/todos', (req,res) =>{
  var todo=new Todo({
    text:req.body.text
  })
  // console.log(req.body);
  todo.save().then((doc) => {
  res.send(doc);
  }, (err) => {
  res.status(400).send(err);
  })
});

app.get('/todos',(req,res) => {
  Todo.find().then((doc) => {
    res.send(doc);
  },(err) => {
  res.status(400).send(err);
})
});

app.listen(3000, () => {
  console.log('Started on port 3000');
})
