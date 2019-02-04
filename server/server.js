const _= require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
// const {mongoose-queries} = require('./playground')
const {User} = require('./models/user');
const {Todo} = require('./models/todo');
const {authenticate} = require('./middleware/authenticate');
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

app.delete('/todos/:id', (req,res) => {
  var id=req.params.id;
  // res.send(id);
  // console.log(req.params);
  if (!ObjectID.isValid(id)) {
    // console.log('ID is not valid');
    res.status(404).send('Id is invalid');
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      res.status(404).send('todo not found');
    }
    res.status(200).send({todo});
    console.log({todo});
  }).catch((err) => res.status(400).send('Id is wrong'));
});

app.patch('/todos/:id',(req,res) => {
  var id=req.params.id;
  var body= _.pick(req.body, ['text','completed']);

  if (!ObjectID.isValid(id)) {
    res.status(404).send('Id is invalid');
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completeAt= new Date().getTime();
  } else {
    body.completed=false;
    body.completeAt=null;
  }

  Todo.findByIdAndUpdate(id, {$set: body},{new:true}).then((todo) => {
    if (!todo) {
      return res.status(400).send();
    }
    res.status(200).send({todo});
  }).catch((err) => { res.status(400).send()});
});

app.post('/users',(req,res) => {
  var body=_.pick(req.body,['email','password']);
  var user=new User(body);

  user.save().then(() => {
     return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth',token).status(200).send(user);
  }).catch((err) => {
    res.status(400).send(err);
  })
}
);


app.get('/users/me',authenticate, (req,res) => {
  res.status(200).send(req.user);
});

app.post('/users/login',(req,res) => {
  var body=_.pick(req.body,['email','password']);
  User.findByCrendentials(body.email,body.password).then((user) => {
    // res.status(200).send(user);
    return user.generateAuthToken().then((token) => {
      res.header('x-auth',token).status(200).send(user);
    });
  }).catch((err) => {
    res.status(400).send(err);
  })
}
);

app.delete('/users/me/token', authenticate , (req,res) => {
  console.log('working');
req.user.removeToken(req.token).then(() => {
  res.status(200).send('Token has been Deleted!');
}, () => {
  res.status(400).send();
});
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
})
