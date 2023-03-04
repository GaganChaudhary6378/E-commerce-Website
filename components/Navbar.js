import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";

export default function Navbar() {
  function toggleCart() {
    if (ref.current.classList.contains("block")) {
      ref.current.classList.remove("block");
      ref.current.classList.add("hidden");
    } else if (!ref.current.classList.contains("block")) {
      ref.current.classList.remove("hidden");
      ref.current.classList.add("block");
    }
  }
  const ref = useRef();
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 mb-1 shadow-md shadow-gray-300">
      <div className="logo mx-5">
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
      <div
        onClick={toggleCart}
        className="cart absolute right-0 top-2 mx-5 md:mt-2 font-bold hover:cursor-pointer "
      >
        <AiOutlineShoppingCart className="text-xl md:text-2xl" />
      </div>
      <div
        ref={ref}
        className="w-80 h-full sideCart absolute top-0 right-0 bg-pink-200 px-6 py-10 z-10 hidden"
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 text-pink-500"
        >
          <AiFillCloseCircle className="text-xl hover:cursor-pointer" />
        </span>
        <ul className="list-decimal font-semibold">
          <li>
            <div className="pl-4 item flex my-5">
              <div className="w-2/3 font-semibold">T-shirts-Shop in loop</div>
              <div className="flex font-semibold items-center justify-center w-1/3">
                <AiFillMinusCircle className="cursor-pointer text-pink-500" />
                <span className="mx-2 text-sm">1</span>
                <AiFillPlusCircle className="cursor-pointer text-pink-500" />
              </div>
            </div>
          </li>
          <li>
            <div className="pl-4 item flex my-5">
              <div className="w-2/3 font-semibold">T-shirts-Shop in loop</div>
              <div className="flex font-semibold items-center justify-center w-1/3">
                <AiFillMinusCircle className="cursor-pointer text-pink-500" />
                <span className="mx-2 text-sm">1</span>
                <AiFillPlusCircle className="cursor-pointer text-pink-500" />
              </div>
            </div>
          </li>
          <li>
            <div className="pl-4 item flex my-5">
              <div className="w-2/3 font-semibold">T-shirts-Shop in loop</div>
              <div className="flex font-semibold items-center justify-center w-1/3">
                <AiFillMinusCircle className="cursor-pointer text-pink-500" />
                <span className="mx-2 text-sm">1</span>
                <AiFillPlusCircle className="cursor-pointer text-pink-500" />
              </div>
            </div>
          </li>
          <li>
            <div className="pl-4 item flex my-5">
              <div className="w-2/3 font-semibold">T-shirts-Shop in loop</div>
              <div className="flex font-semibold items-center justify-center w-1/3">
                <AiFillMinusCircle className="cursor-pointer text-pink-500" />
                <span className="mx-2 text-sm">1</span>
                <AiFillPlusCircle className="cursor-pointer text-pink-500" />
              </div>
            </div>
          </li>
          <li>
            <div className="pl-4 item flex my-5">
              <div className="w-2/3 font-semibold">T-shirts-Shop in loop</div>
              <div className="flex font-semibold items-center justify-center w-1/3">
                <AiFillMinusCircle className="cursor-pointer text-pink-500" />
                <span className="mx-2 text-sm">1</span>
                <AiFillPlusCircle className="cursor-pointer text-pink-500" />
              </div>
            </div>
          </li>
        </ul>
        <div className="flex flex-row justify-between">
          <button className="flex mt-16 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg">
            <BsFillBagCheckFill className="m-1" />
            Checkout
          </button>
          <button className="flex mx-auto mt-16 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
