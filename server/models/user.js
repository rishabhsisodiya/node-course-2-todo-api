const validator = require('validator');
const mongoose = require('mongoose');
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const _= require('lodash');
const bcrypt = require('bcryptjs');

var userSchema= new mongoose.Schema({
  email: {
    type:String,
    minlength:1,
    trim:true,
    required:true,
    unique:true,
    validate:{
      validator:validator.isEmail,
      message:`{VALUE} is not a valid email`
    }
  },
  password:{
    type:String,
    require:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});
userSchema.methods.toJSON = function () {
  var user = this;
  var userObject=user.toObject();

  return _.pick(userObject, ['_id','email']);
};

userSchema.methods.generateAuthToken = function () {
  var user=this;
  var access='auth';
  var token=jwt.sign({_id: user._id.toHexString(),access}, 'abc123').toString();
  user.tokens=user.tokens.concat([{access, token}]);
  return user.save().then( () => {
    return token;
  })
}

userSchema.statics.findByToken = function (token) {
  var user = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return user.findOne({
    '_id': decoded._id ,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

userSchema.pre('save', function (next) {
  var user= this;
  if (user.isModified('password')) {
    var password=user.password;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err,hash) => {
        user.password=hash;
        console.log(hash);
        next();
      });
    });

  } else {
    next();
  }

});

var User=mongoose.model('User', userSchema);

module.exports={User};
