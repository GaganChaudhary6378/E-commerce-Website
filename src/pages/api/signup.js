import connectDb from "../../../middleware/mongoose";
import User from "../../../models/User";
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
// here we are using crypto js for encrpting our passeord

const handler =async(req,res) => {
    if(req.method=='POST'){
        const {name,email}=req.body
        // console.log(CryptoJS.AES.encrypt(req.body.password,"secret123").toString())
        let u=new User({name,email,password:CryptoJS.AES.encrypt(req.body.password,"secret123").toString()})
        
        await u.save()
        res.status(200).json({success:"success"});
    }else{
        res.status(400).json({error:"This method is not allowed"});
    }
}
export default connectDb(handler)