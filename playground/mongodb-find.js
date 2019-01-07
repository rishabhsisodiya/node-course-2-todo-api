const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDb server');;
  }
  console.log('Connected to MongoDb server');
  const db=client.db('ToDoApp');
  // db.collection('ToDos').find({completed:true}).toArray().then( (docs) => {
  //   console.log('ToDos:');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch ToDos');
  // })
  db.collection('ToDos').find().count().then( (count) => {
    console.log('ToDos:');
    console.log(`count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch ToDos');
  })
  client.close();
});
