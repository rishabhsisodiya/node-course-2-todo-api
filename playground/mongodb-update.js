const {MongoClient,ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDb server');;
  }
  console.log('Connected to MongoDb server');
  const db=client.db('ToDoApp');
  db.collection('Users').findOneAndUpdate({_id:new ObjectId("5c3331180425f389bc1ccd11")
  }, {
    $set:{
      name:'Rishabh'
    },
    $inc: {
      age: 1
    }
  }, {
      returnOriginal: false
  }).then((result) => {
    console.log(result);
  })

  // client.close();
});
