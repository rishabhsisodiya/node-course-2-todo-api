const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password='213abc!';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err,hash) => {
    console.log(hash);
  });
});

var hashedPassword= '$2a$10$zuAAUnmEzcM89bpWp8/hceDVW7YdSGeRfM0h/TkhxMSSV8o1.dvV6';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});


// var data = {
//   id:4
// };
//
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// var decode=jwt.verify(token, '123abc');
// console.log(decode);

// var message = 'I am user number 3';
// var hash=SHA256(message).toString();

// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);
//
// var data = {
//   id:4
// };
// var token ={
//   data,
//   hash: SHA256(JSON.stringify(data)+'somesecret').toString()
// }
//
// token.data.id=5;
// token.hash = SHA256(JSON.stringify(token.data)).toString()
//
// var resultHash = SHA256(JSON.stringify(token.data).toString());
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust');
// }
