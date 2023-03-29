const mongoose =require('mongoose');

const ServiceSchema=new mongoose.Schema({
    state:{type:String,require:true},
    city: {type:String,require:true},
    pincode : {type: Number,require:true,unique:true},
},{timestamps:true})

mongoose.models={}
export default mongoose.model("Service",ServiceSchema);