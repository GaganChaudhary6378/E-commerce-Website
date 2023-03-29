
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {type: String,required:true},
    email: {type: String,required:true,unique:true},
    password: {type: String,required:true},
  },{timestamps:true});
  // timestamps is needed to created updatedat or created at automatically
  mongoose.models={}
  export default mongoose.model("User",UserSchema);