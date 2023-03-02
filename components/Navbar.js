import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Navbar(){
    return (
        <div className="flex flex-col md:flex-row md:justify-start justify-center items-center">
            <div className="logo mx-5">
                <Image width={170} height={40} src="/logoName.png"></Image>
            </div>
            <div className="nav">
                <ul className="flex items-centre gap-4 mt-1 font-bold">
                    <Link href={'/'}><li>Tshirts</li></Link>
                    <Link href={'/'}><li>Hoodies</li></Link>
                    <Link href={'/'}><li>Stickers</li></Link>
                    <Link href={'/'}><li>Mugs</li></Link>
                </ul>
            </div>
            <div className="cart absolute right-0 top-0 mx-5 md:mt-1 font-bold">
                <button>Cart</button>
            </div>
        </div>
    )
}