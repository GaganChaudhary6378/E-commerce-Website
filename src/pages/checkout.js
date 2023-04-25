import React from "react";
import Link from "next/link"; 
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import Head from "next/head";
import { BsFillBagCheckFill } from "react-icons/bs";
import Script from "next/script";

export default function checkout({
  cart,
  subTotal,
  removeFromCart,
  addToCart,
}) {

  async function initiatePayment()  {
    // Here we are getting the transaction token
  let oid = Math.floor(Math.random() * Date.now());


    const data = { cart, subTotal, oid, email: "email" };

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let txnRes = await a.json();
    // console.log(txnToken);
    let txnToken=txnRes.txnToken;
    // const data = { username: "example" };
    // postJSON(data);
    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId": oid /* update order id */,
        "token": txnToken /* update token value */,
        "tokenType": "TXN_TOKEN",
        "amount": subTotal /* update amount */,
      },
      "handler": {
        "notifyMerchant": function (eventName, data) {
          // console.log("notifyMerchant handler function called");
          // console.log("eventName => ", eventName);
          // console.log("data => ", data);
        },
      },
    };
    console.log(window.user)
    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        // console.log("error => ", error);
      })
  }
  return (
    <div className="container m-auto">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      {/* <Script
        type="application/javascript"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
        crossorigin="anonymous"
      /> this is going to be removed further */}
      
      <Script src="https://checkout.razorpay.com/v1/checkout.js"/>

      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="font-bold text-xl mx-11">1. Delivery Details</h2>
      <div className="mx-auto flex my-4 mr-10 ml-10">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label for="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label for="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="px-2 w-100 mr-10 ml-10">
        <div className="relative mb-4">
          <label for="Address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            name="Address"
            id="address"
            cols="30"
            rows="2"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="mx-auto flex my-4 mr-10 ml-10">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label for="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label for="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-4 mr-10 ml-10">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label for="phone" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label for="pincode" className="leading-7 text-sm text-gray-600">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <h2 className="font-bold text-xl mx-11">2. Review Cart & Pay</h2>
      <div className="w-100 sideCart p-6 m-10 mt-3 bg-pink-200">
        <ul className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="mt-10">
              No items in the cart. Please go ahead and add a few items in your
              cart to checkout.
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="pl-4 item flex my-5">
                  <div className=" font-semibold">
                    {cart[k].name}({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className="flex font-semibold items-center justify-center w-1/3">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                    <AiFillPlusCircle
                      onClick={() =>
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        )
                      }
                      className="cursor-pointer text-pink-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <span className="total relative font-bold mx-4">
          Subtotal : {subTotal}
        </span>
      </div>
      <div className="mx-10">
        <button
          onClick={initiatePayment}
          className="flex mt-16 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg"
        >
          <BsFillBagCheckFill className="m-1" />
          Pay ₹{subTotal}
        </button>
      </div>
    </div>
  );
}
