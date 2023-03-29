import Service from "../../../models/Service";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  let codes = await Service.find();
  let pincodes = {};
  for (let item of codes) {
    if (item.state in pincodes) {
      if (!pincodes[item.state].city.includes(item.city)) {
        pincodes[item.state].city.push(item.city);
      }
      if (!pincodes[item.state].pincode.includes(item.pincode)) {
        pincodes[item.state].pincode.push(item.pincode);
      }
    } else {
      pincodes[item.state] = JSON.parse(JSON.stringify(item));
      pincodes[item.state].city = [item.city];
      pincodes[item.state].pincode = [item.pincode];
    }
  }
  res.status(200).json({ pincodes });
};

export default connectDb(handler);
