import pkg from 'mongoose';
const { Schema, model } = pkg;

const UserSchema  = new Schema({
    name:String,
    email:String,
    password:String
        
});

const User = model('User', UserSchema);

// User.createCollection().then(function(collection) {
//   console.log('User Collection is created!');
// });

export default User