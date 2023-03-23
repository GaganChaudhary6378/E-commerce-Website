const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {type: String,required:true},
    products : [{
        productId:{type: String},
        quantity: {type:Number,default:1}
    }],
    address:{type:String,required:true},
    amount:{type:Number,required:true},
    status:{type:String,default:'Pending',required:true},
  },{timestamps:true});
  // timestamps is needed to created updatedat or created at automatically
  mongoose.models={}
  export default mongoose.model("Order",OrderSchema);