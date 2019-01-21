const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
// const {mongoose-queries} = require('./playground')
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

var app=express();
const port= process.env.PORT || 3000;
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

//GET/todos/1234
app.get('/todos/:id', (req,res) => {
  var id=req.params.id;
  // res.send(id);
  // console.log(req.params);
  if (!ObjectID.isValid(id)) {
    // console.log('ID is not valid');
    res.status(404).send('Id is invalid');
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      res.status(404).send('todo not found');
    }
    res.status(200).send({todo});
  }).catch((err) => res.status(400).send('Id is wrong'));
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
})
