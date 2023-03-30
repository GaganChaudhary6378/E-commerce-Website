import connectDb from "../../../middleware/mongoose";
import User from "../../../models/User";
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    
    const bytes=CryptoJS.AES.decrypt(user.password,'secret123')
    console.log(bytes.toString(CryptoJS.enc.Utf8))
    decryptedPass=JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    if (user) {
      if (req.body.email == user.email && req.body.password == decryptedPass) {
        res
          .status(200)
          .json({ success: true, email: user.email, name: user.name });
      } else {
        res
          .status(200)
          .json({ success: false, error: "Credentials are not matching" });
      }
    } else {
      res.status(200).json({ success: false, error: "User not found" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};
export default connectDb(handler);
