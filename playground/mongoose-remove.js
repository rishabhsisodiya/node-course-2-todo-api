const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose.js');
const {User} = require('./../server/models/user');
const {Todo} = require('./../server/models/todo');

// Todo.remove({}).then((result) => {
//   console.log(result);
// })

// Todo.findOneAndRemove
// Todo.findByIdAndRemove
Todo.findOneAndRemove('5c40a2b599d7371738ee3382').then((todo) => {
  console.log(todo);
})

Todo.findByIdAndRemove('5c40a2b599d7371738ee3382').then((todo) => {
  console.log(todo);
})
