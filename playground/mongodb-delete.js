const {MongoClient,ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDb server');;
  }
  console.log('Connected to MongoDb server');
  const db=client.db('ToDoApp');
  // Delete Many
  // db.collection('ToDos').deleteMany({text:'Something to do'}).then((result) => {
  //   console.log(result);
  // })
  //Delete insertOne
  // db.collection('ToDos').deleteOne({text:'Something to do'}).then((result) => {
  //   console.log(result);
  // })
  //findone and delte
  // db.collection('ToDos').findOneAndDelete({text:'Something to do'}).then((result) => {
  //   console.log(result);
  // })

  //challenge question: delete using ID
  // db.collection('Users').deleteMany({name:'rishabh'}).then((result) => {
  //   console.log(result);
  // })

// delete using ID
  db.collection('Users').findOneAndDelete({_id:new ObjectId("5c3331070425f389bc1ccd0f")}).then((result) => {
    console.log(result);
  })

  // client.close();
});
