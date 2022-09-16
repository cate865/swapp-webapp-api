import pkg from 'mongoose';
const { Schema, model } = pkg;

const UserSchema  = new Schema({
    name:{
        type:String,
        
    },
    email:{
        type: String,
        
    },
    password:{
        type: String,
        
    }
});

const User = model('Product', UserSchema);

export default User