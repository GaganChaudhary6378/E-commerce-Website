import Service from "../../../models/Service";
import connectDb from "../../../middleware/mongoose";

const handler=async(req,res) => {
    if(req.method=='POST'){
        for(let i=0;i<req.body.length;i++){
            let a=new Service({
                state:req.body[i].state,
                city:req.body[i].city,
                pincode: req.body[i].pincode,
            })
            await a.save();
        }
        res.status(200).json({success:"success"});
    }else{
        res.status(400).json({error:"This method is not allowed"});
    }
}

export default connectDb(handler);