import Stripe from "stripe";

const stripe = Stripe(process.env.PAYTM_MKEY);

import axios from "axios"

export default async function handler(req, res) {
  if (req.method !== "POST") return

  // console.log({req: req.body.cart, item: Object.keys(req)})
  const session = await stripe.checkout.sessions.create({
 
    line_items: Object.keys(req.body.cart).map((key) => ({
      price_data: {currency: 'INR', product_data: {name: req.body.cart[key].name}, unit_amount: req.body.cart[key].price * 100},
      quantity: req.body.cart[key].qty
    })),
    // [
    //   {
    //     // price: req.body.subtotal,
    //     // currency: "INR",
    //     price_data: {currency: 'INR', product_data: {name: 'T-shirt'}, unit_amount: 2000},
    //     // orderId: req.body.oid,
    //     // receipt: "receipt#1",
    //     // callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
    //     // userInfo: {
    //     //   custId: req.body.email,
    //     //   key2: "value2",
    //     // },
    //     quantity: 1
    //   },
      
    // ],
    mode: "payment",
    success_url:`${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
    cancel_url: "http://localhost:4242/cancel",
  });

  // console.log({session: session.url})

  res.json({url: session.url})



  
//  axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/create-checkout-session`, async (req, res) => {
//   console.log({req})
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         amount: req.body.subtotal,
//         currency: "INR",
//         orderId: req.body.oid,
//         receipt: "receipt#1",
//         callbackUrl: `${NEXT_PUBLIC_HOST}/api/posttransaction`,
//         userInfo: {
//           custId: req.body.email,
//           key2: "value2",
//         },
//       },
//     ],
//     mode: "payment",
//     // success_url:`${NEXT_PUBLIC_HOST}/api/posttransaction`,
//     // cancel_url: "http://localhost:4242/cancel",
//   });

//   console.log({session})

//   // res.send({ url: session.url });


// });  
}


/*
 * import checksum generation utility
 * You can get this utility from https://developer.paytm.com/docs/checksum/
 */

// const PaytmChecksum = require('paytmchecksum');
// const Razorpay = require("razorpay");

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

// module.exports = router;
