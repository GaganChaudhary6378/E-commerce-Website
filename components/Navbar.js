import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

export default function Navbar({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) {
  const [dropDown, setDropdown] = React.useState(false);

  function toggleCart() {
    if (ref.current.classList.contains("block")) {
      ref.current.classList.remove("block");
      ref.current.classList.add("hidden");
    } else if (
      !ref.current.classList.contains("block") &&
      Object.keys(cart).length !== 0
    ) {
      ref.current.classList.remove("hidden");
      ref.current.classList.add("block");
    }
  }
  const ref = useRef();
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 mb-1 shadow-md shadow-gray-300 sticky top-0 z-10 bg-white">
      <div className="logo mr-auto md:mx-5">
        <Link href={"/"}>
          <Image width={170} height={40} src="/logoName.png"></Image>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-centre  md:-mt-2 gap-4 font-bold mt-4">
          <Link href={"/tshirts"}>
            <li>Tshirts</li>
          </Link>
          <Link href={"/hoodies"}>
            <li>Hoodies</li>
          </Link>
          <Link href={"/stickers"}>
            <li>Stickers</li>
          </Link>
          <Link href={"/mugs"}>
            <li>Mugs</li>
          </Link>
        </ul>
      </div>
      <div className="cart items-center absolute right-0 top-2 mx-5 md:mt-2 font-bold hover:cursor-pointer flex ">
        <a onMouseOver={() => {setDropdown(true)}} onMouseLeave={() => {setDropdown(false)}}>
          {dropDown && (
            <div className="absolute bg-white shadow-lg border top-6 py-4 right-8 rounded-md px-5 w-32">
              <ul>
                <Link href={'/myaccount'}><li className="py-1 text-sm hover:text-pink-700">My Account</li></Link>
                <Link href={'/orders'}><li className="py-1 text-sm hover:text-pink-700">Orders</li></Link>
                <li onClick={logout} className="py-1 text-sm hover:text-pink-700">Logout</li>
              </ul>
            </div>
          )}
          {user.value && (
            <MdAccountCircle
              className="text-xl md:text-2xl mx-2"
            />
          )}
        </a>

        {!user.value && (
          <Link href={"/login"}>
            <button className="bg-pink-400 px-2 py-1 rounded-md text-sm mx-2 text-white">
              Login
            </button>
          </Link>
        )}
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="text-xl md:text-2xl"
        />
      </div>

      <div
        ref={ref}
        className="w-80 h-[100vh] sideCart overflow-y-scroll absolute top-0 right-0 bg-pink-200 px-6 py-10 z-10 hidden"
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 text-pink-500"
        >
          <AiFillCloseCircle className="text-xl hover:cursor-pointer" />
        </span>
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
                  <div className="w-2/3 font-semibold">
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
        <div className="flex flex-row justify-between">
          <Link href={"/checkout"}>
            <button className="flex mt-6 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg">
              <BsFillBagCheckFill className="m-1" />
              Checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex mx-auto mt-6 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
