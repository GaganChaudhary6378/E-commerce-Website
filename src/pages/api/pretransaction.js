import { rejects } from "assert";
// const Razorpay = require("razorpay");
import { Razorpay } from "razorpay-checkout";
const https = require("https");
/*
 * import checksum generation utility
 * You can get this utility from https://developer.paytm.com/docs/checksum/
 */

// const PaytmChecksum = require('paytmchecksum');
// const Razorpay = require("razorpay");

export default async function handler(req, res) {
  res.status(200).json({ name: "Gagan Sir" });
  if (req.method === "POST") {
    // Initialize razorpay object
    const instance = new Razorpay({
      key_id: process.env.PAYTM_MID,
      key_secret: process.env.PAYTM_MKEY,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const options = {
      amount: req.body.subtotal,
      orderId: req.body.oid,
      currency:"INR",
      receipt: shortid.generate(),
      payment_capture,
      callbackUrl: `${NEXT_PUBLIC_HOST}/api/posttransaction`,
      userInfo: {
        custId: req.body.email,
        key2: "value2",
      },
    };
   
    instance.handler.create(options,function(err,order){
      if(err){
        return res.send({code :500,message:'Server Err'});
      }
      return res.send({code :200,message:'order created',data:order})
    })
    module.exports.verify =() => {
      res.send({verify})
    }

    // if (req.method == "POST") {
    //   var instance = new Razorpay({
    //     key_id: process.env.PAYTM_MID,
    //     key_secret: process.env.PAYTM_MKEY,
    //   });

    //   instance.orders.create({
    //     amount: req.body.subtotal,
    //     currency: "INR",
    //     orderId: req.body.oid,
    //     receipt: "receipt#1",
    //     callbackUrl: `${NEXT_PUBLIC_HOST}/api/posttransaction`,
    //     userInfo: {
    //       custId: req.body.email,
    //       key2: "value2",
    //     },
    //   });

    //   /*
    //    * Generate checksum by parameters we have in body
    //    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
    //    */
    //   // const checksum = await PaytmChecksum.generateSignature(
    //   //   JSON.stringify(paytmParams.body),
    //   //   process.env.PAYTM_MKEY
    //   // );
    //   // paytmParams.head = {
    //   //   signature: checksum,
    //   // };
    //   var {
    //     validatePaymentVerification,
    //   } = require("./dist/utils/razorpay-utils");

    //   validatePaymentVerification(
    //     { order_id: req.body.oid, payment_id: process.env.NEXT_PUBLIC_PAYTM_MID },
    //     signature,
    //     secret
    //   );

    // var post_data = JSON.stringify(paytmParams);

    // const requestAsync = () => {
    //   return new Promise((resolve, reject) => {
    //     var options = {
    //       hostname: "secureg.paytm.in" /* for Production */, // hostname: 'securegw.paytm.in',

    //       port: 443,
    //       path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Content-Length": post_data.length,
    //       },
    //     };

    //     var response = "";
    //     var post_req = https.request(options, function (post_res) {
    //       post_res.on("data", function (chunk) {
    //         response += chunk;
    //       });

    //       post_res.on("end", function () {
    //         console.log("Response: ", response);
    //         resolve(JSON.parse(response).body);
    //       });
    //     });

    //     post_req.write(post_data);
    //     post_req.end();
    //   });
    // };
    // let myr = await requestAsync();
    // res.status(200).json(myr);
  }
}
