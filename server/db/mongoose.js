const mongoose = require('mongoose');

mongoose.Promise= global.Promise;
mongoose.connect(porcess.env.MONGODB_URI || 'mongodb://localhost:27017/ToDoApp');
module.exports={mongoose};
