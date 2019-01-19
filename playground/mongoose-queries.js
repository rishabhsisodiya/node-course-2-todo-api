const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose.js');
const {User} = require('./../server/models/user');
const {Todo} = require('./../server/models/todo');

// var id='5c40960e1608421380f81c46';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID is not valid');
//
// }
// Todo.find({
//   _id: id
// }).then((todo) => {
//   console.log('Todos',todo);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todos',todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by Id',todo);
// }).catch((err) => console.log(err));

var id='5c38a16572683b0d2c808aff';

User.findById(id).then((user) => {
  if (!user) {
    return console.log('Id not found');
  }
  console.log('User By Id', user);
})
